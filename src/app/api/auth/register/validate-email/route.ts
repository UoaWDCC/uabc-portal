import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { sendVerificationCodeEmail } from "@/emails";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { insertVerificationToken } from "@/services/user";

const postRequestSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    //validate email
    const { email } = postRequestSchema.parse(body);

    //check if email is already in use
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user)
      return NextResponse.json(
        { errors: "Email already in use" },
        { status: 400, statusText: "Email already in use" }
      );

    const token = await insertVerificationToken(email);

    await sendVerificationCodeEmail(email, token.toString());

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
