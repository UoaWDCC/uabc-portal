import { NextRequest, NextResponse } from "next/server";
import { and, eq, gt } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { forgotPasswordTokens, users } from "@/lib/db/schema";
import { deobfuscateSqid } from "@/lib/sqid";

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
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/\d/, { message: "Password must contain a number" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" }),
});

export async function POST(req: NextRequest) {
  try {
    const searchParams = searchParamSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    );

    const token = deobfuscateSqid(searchParams.resetPasswordToken);
    const resetPasswordToken = await db.query.forgotPasswordTokens.findFirst({
      where: and(
        eq(forgotPasswordTokens.token, token.toString()),
        gt(forgotPasswordTokens.expires, new Date())
      ),
    });

    if (!resetPasswordToken) {
      return NextResponse.json("ResetPasswordToken is invalid", {
        status: 403,
      });
    } else {
      const body = await req.json();
      const { newPassword, confirmPassword } = postRequestSchema.parse(body);

      if (newPassword !== confirmPassword) {
        return NextResponse.json("Passwords do not match", {
          status: 400,
        });
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    } else {
      return new Response("Internal server error", { status: 500 });
    }
  }
}
