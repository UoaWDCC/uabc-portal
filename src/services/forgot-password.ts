import "server-only";

import { createHash, randomBytes } from "crypto";
import { and, eq } from "drizzle-orm";

import { FORGOT_PASSWORD_TOKEN_EXPIRY_TIME } from "@/lib/constants";
import { db } from "@/lib/db";
import { forgotPasswordTokens } from "@/lib/db/schema";

/**
 * creates and inserts a password token into the database
 */
export const insertForgotPasswordToken = async (email: string) => {
  await db
    .delete(forgotPasswordTokens)
    .where(and(eq(forgotPasswordTokens.identifier, email)));

  const token = randomBytes(32).toString("hex");
  const hashedToken = createHash("sha256").update(token).digest("hex");

  await db.insert(forgotPasswordTokens).values({
    identifier: email,
    token: hashedToken,
    expires: new Date(Date.now() + FORGOT_PASSWORD_TOKEN_EXPIRY_TIME * 1000),
  });

  return token;
};
