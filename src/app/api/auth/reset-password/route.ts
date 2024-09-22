import { NextRequest, NextResponse } from "next/server";
import { and, eq, gt } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { forgotPasswordTokens, users } from "@/lib/db/schema";
import { deobfuscateSqid } from "@/lib/sqid";
import { hash } from "bcrypt";

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

export async function GET(req: NextRequest) {
  try {
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
      return NextResponse.json("ResetPasswordToken is invalid", {
        status: 403,
      });
    } else {
      return NextResponse.json({ email: resetPasswordToken.identifier}, { status: 200 });
    }
  } catch (error : any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    } else {
      return NextResponse.json({ errors: "Internal Server Error" }, { status: 500 });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const searchParams = searchParamSchema.parse(
      Object.fromEntries(req.nextUrl.searchParams)
    );

    const token = searchParams.resetPasswordToken;
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
    }
    
    const user = await db.query.users.findFirst({
      where: eq(users.email, resetPasswordToken!.identifier)
    });

    if (!users) {
      return NextResponse.json("User does not exist", {
        status: 403,
      });
    } else {
      //change the password of the user
      const body = await req.json();
      const { newPassword, confirmPassword } = postRequestSchema.parse(body);

      if (newPassword !== confirmPassword) {
        return NextResponse.json("Passwords do not match", {
          status: 400,
        });
      }

      const costFactor = 12;
      const hashedPassword = await hash(newPassword, costFactor); 

      await db.transaction(async (tx) => {
        await tx.update(users).set({
          password: hashedPassword,
        }).where(eq(users.email, resetPasswordToken!.identifier));
      });

      return NextResponse.json("Password changed successfully", {
        status: 200,
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    } else {
      return new Response("Internal server error", { status: 500 });
    }
  }
}
