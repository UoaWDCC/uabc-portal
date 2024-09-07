import { eq } from "drizzle-orm";
import { z } from "zod";

import { sendVerificationCodeEmail } from "@/emails";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { routeWrapper } from "@/lib/wrappers";
import { insertVerificationToken } from "@/services/user";

const postRequestSchema = z.object({
  email: z.string().email(),
});

export const POST = routeWrapper(async (req) => {
  const body = await req.json();

  const { email } = postRequestSchema.parse(body);

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (user) return new Response("Email already in use", { status: 400 });

  const token = await insertVerificationToken(email);

  await sendVerificationCodeEmail(email, token.toString());

  return new Response(null, { status: 204 });
});
