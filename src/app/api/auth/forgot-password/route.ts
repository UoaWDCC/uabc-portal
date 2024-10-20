import { type NextRequest } from "next/server";
import { and, eq, isNotNull } from "drizzle-orm";
import { z } from "zod";

import { sendForgotPasswordEmail } from "@/emails";
import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { rateLimit } from "@/lib/rate-limit";
import { routeWrapper } from "@/lib/wrappers";
import { insertForgotPasswordToken } from "@/services/forgot-password";

export const dynamic = "force-dynamic";

const postRequestSchema = z.object({
  email: z.string().email(),
});

const limiter = rateLimit({
  interval: 60 * 60 * 1000,
});

export const POST = routeWrapper(async function (req: NextRequest) {
  const body = await req.json();

  // validate email
  const { email } = postRequestSchema.parse(body);

  const isRateLimited = limiter.check(3, email);

  if (isRateLimited)
    return responses.tooManyRequests({
      message: "Rate limit exceeded, try again in 1 hour.",
    });

  // to check if email exists
  const user = await db.query.users.findFirst({
    where: and(eq(users.email, email), isNotNull(users.password)),
  });

  if (user) {
    const token = await insertForgotPasswordToken(email);
    await sendForgotPasswordEmail(user, token);
  }

  return responses.success();
});
