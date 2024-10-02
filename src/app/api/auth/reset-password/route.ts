import { NextRequest, NextResponse } from "next/server";
import { and, eq, gt } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { forgotPasswordTokens, users } from "@/lib/db/schema";
import { hash } from "bcrypt";
import { routeWrapper } from "@/lib/wrappers";
import { responses } from "@/lib/api/responses";

const searchParamSchema = z.object({
  resetPasswordToken: z.string(),
});

const postRequestSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/\d/, { message: "Password must contain a number" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" }),
  resetPasswordToken: z.string()
});

export const GET = routeWrapper(
  async (req: NextRequest) => {
    const searchParams = searchParamSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    );
    
    const token = searchParams.resetPasswordToken;
    const resetPasswordToken = await db.query.forgotPasswordTokens.findFirst({
      where: and(
        eq(forgotPasswordTokens.token, token),
        gt(forgotPasswordTokens.expires, new Date())
      ),
    });

    if (!resetPasswordToken) {
      return responses.forbidden();
    } else {
      return NextResponse.json({ email: resetPasswordToken.identifier}, { status: 200 });
    }
  } 
);

export const POST = routeWrapper(
  async (req: NextRequest) => {
    const body = await req.json();
    const { newPassword, resetPasswordToken } = postRequestSchema.parse(body);

    const matchingResetPasswordToken = await db.query.forgotPasswordTokens.findFirst({
      where: and(
        eq(forgotPasswordTokens.token, resetPasswordToken),
        gt(forgotPasswordTokens.expires, new Date())
      ),
    });

    if (!matchingResetPasswordToken) {
      return responses.forbidden();
    }
    
    const user = await db.query.users.findFirst({
      where: eq(users.email, matchingResetPasswordToken!.identifier)
    });

    if (!user) {
      return responses.forbidden();
    } else {
      //change the password of the user
      const costFactor = 12;
      const hashedPassword = await hash(newPassword, costFactor); 

      await db.update(users)
        .set({password: hashedPassword})
        .where(eq(users.email, matchingResetPasswordToken!.identifier));

      await db.delete(forgotPasswordTokens)
        .where(eq(forgotPasswordTokens.identifier, matchingResetPasswordToken!.identifier));

      return NextResponse.json("Password changed successfully", {
        status: 200,
      });
    }
  }
);
