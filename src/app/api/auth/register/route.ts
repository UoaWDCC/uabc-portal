import { hash } from "bcrypt";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { users, verificationTokens } from "@/lib/db/schema";
import { routeWrapper } from "@/lib/wrappers";

const postRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/\d/).regex(/[a-z]/).regex(/[A-Z]/),
  token: z.string(),
});

export const POST = routeWrapper(async (req) => {
  const body = await req.json();

  //validate email and password
  const { email, password, token } = postRequestSchema.parse(body);

  //check if email is already in use
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (user)
    return responses.badRequest({
      message: "Email already in use.",
    });

  const [lastToken] = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.identifier, email))
    .orderBy(desc(verificationTokens.expires))
    .limit(1);

  if (!lastToken || lastToken.expires < new Date() || lastToken.token !== token)
    return responses.badRequest({
      message: "Invalid verification token.",
    });

  const costFactor = 12;
  const hashedPassword = await hash(password, costFactor);

  //save user to database
  await db.insert(users).values({
    id: crypto.randomUUID(),
    email: email,
    password: hashedPassword,
  });

  return responses.success({
    message: "User successfully registered.",
  });
});
