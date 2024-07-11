import { NextResponse, type NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { sendVerificationCodeEmail } from "@/emails";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { insertVerificationToken } from "@/services/user";

const postRequestSchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email } = postRequestSchema.parse(body);

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user) return new Response("Email already in use", { status: 400 });

    const token = await insertVerificationToken(email);

    await sendVerificationCodeEmail(email, token.toString());

    return new Response(null, { status: 204 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ errors: e.errors }, { status: 400 });
    }
    if (e instanceof Error && e.message === "Rate limit exceeded") {
      return new Response("Rate limit exceeded", { status: 429 });
    }
    return new Response("Internal server error", { status: 500 });
  }
}
