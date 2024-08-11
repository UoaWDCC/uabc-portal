import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schema";

const postRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/\d/).regex(/[a-z]/).regex(/[A-Z]/),
  token: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    //validate email and password
    const { email, password, token } = postRequestSchema.parse(body);

    //check if email is already in use
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user)
      return NextResponse.json(
        { errors: "Email already in use" },
        { status: 400, statusText: "Email already in use" }
      );

    const [lastToken] = (
      await db
        .select()
        .from(verificationTokens)
        .where(eq(verificationTokens.identifier, email))
        .orderBy(desc(verificationTokens.expires))
        .limit(1)
    );

    if (!lastToken || lastToken.expires < new Date() || lastToken.token !== token)
      return NextResponse.json(
        { errors: "Invalid token" },
        { status: 400, statusText: "Invalid token" }
      );

    const costFactor = 12;
    const hashedPassword = await hash(password, costFactor);

    //save user to database
    await db.insert(users).values({
      id: crypto.randomUUID(),
      email: email,
      password: hashedPassword,
    });

    return new Response("User registered successfully", {
      status: 200,
      statusText: "User registered successfully",
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ errors: e.errors }, { status: 400 });
    }
    return new Response("Internal server error", { status: 500 });
  }
}
