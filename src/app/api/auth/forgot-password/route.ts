import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { sendForgotPasswordEmail } from "@/emails";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { obfuscateId } from "@/lib/sqid";
import { insertForgotPasswordToken } from "@/services/forgot-password";

const postRequestSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    //validate email
    const { email } = postRequestSchema.parse(body);

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user) {
      const token = await insertForgotPasswordToken(email);
      await sendForgotPasswordEmail(user, obfuscateId(token));
    }

    return new Response(null, {
      status: 204,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ errors: e.errors }, { status: 400 });
    }
    return new Response("Internal server error", { status: 500 });
  }
}
