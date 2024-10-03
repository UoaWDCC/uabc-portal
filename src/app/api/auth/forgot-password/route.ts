import { NextResponse } from "next/server";
import { and, eq, isNotNull } from "drizzle-orm";
import { z } from "zod";

import { sendForgotPasswordEmail } from "@/emails";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { insertForgotPasswordToken } from "@/services/forgot-password";
import { routeWrapper } from "@/lib/wrappers";

const postRequestSchema = z.object({
  email: z.string().email(),
});

export const POST = routeWrapper(
  async function (request: Request) {
    const body = await request.json();

    //validate email
    const { email } = postRequestSchema.parse(body);

    //to check if email exists and if user has a password (no password = Oauth user)
    const user = await db.query.users.findFirst({
      where: and(eq(users.email, email), isNotNull(users.password)),
    });

    if (user) { 
      const token = await insertForgotPasswordToken(email);
      await sendForgotPasswordEmail(user, token);
    }

    return new Response(null, {
      status: 204,
    });
  }
);