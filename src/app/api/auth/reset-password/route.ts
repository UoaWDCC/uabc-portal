import { createHash } from "crypto";
import type { NextRequest } from "next/server";
import { hash } from "bcrypt";
import { and, eq, gt } from "drizzle-orm";
import { z } from "zod";

import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { forgotPasswordTokens, users } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { routeWrapper } from "@/lib/wrappers";

export const dynamic = "force-dynamic";

const limiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
});

const postRequestSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/\d/, { message: "Password must contain a number" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" }),
  resetPasswordToken: z.string(),
});

export const POST = routeWrapper(async (req: NextRequest) => {
  const isRateLimited = limiter.check(5);

  if (isRateLimited)
    return responses.tooManyRequests({
      message: "Rate limit exceeded, try again in 1 hour.",
    });

  const body = await req.json();
  const { newPassword, resetPasswordToken } = postRequestSchema.parse(body);

  const hashedToken = createHash("sha256")
    .update(resetPasswordToken)
    .digest("hex");

  const matchingResetPasswordToken =
    await db.query.forgotPasswordTokens.findFirst({
      where: and(
        eq(forgotPasswordTokens.token, hashedToken),
        gt(forgotPasswordTokens.expires, new Date())
      ),
    });

  if (!matchingResetPasswordToken) {
    return responses.badRequest({
      code: "INVALID_CODE",
      message: "Invalid reset token provided",
    });
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, matchingResetPasswordToken.identifier),
  });

  if (!user) {
    return responses.badRequest({
      message: "User does not exist.",
    });
  }
  const hashedPassword = await hash(newPassword, 12);

  //transaction to update the user's password and delete the reset password token
  await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.email, matchingResetPasswordToken.identifier));
    await tx
      .delete(forgotPasswordTokens)
      .where(
        eq(
          forgotPasswordTokens.identifier,
          matchingResetPasswordToken.identifier
        )
      );
  });

  return responses.success({
    message: "Password changed successfully",
  });
});
