import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

const emailSchema = z.string().email();
const passwordSchema = z
  .string()
  .min(8)
  .regex(/\d/)
  .regex(/[a-z]/)
  .regex(/[A-Z]/);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    //validate email and password
    emailSchema.parse(email);
    passwordSchema.parse(password);

    //check if email is already in use
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (user) return new Response("Email already in use", { status: 400 });

    const costFactor = 12;
    const hashedPassword = await hash(password, costFactor);

    //save user to database
    await db.insert(users).values({
      id: crypto.randomUUID(),
      email: email,
      password: hashedPassword,
    });

    return new Response("User registered successfully", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    } else {
      return new Response("Internal server error", { status: 500 });
    }
  }
}
