import "server-only";

import { createHash } from "crypto";
import { and, eq } from "drizzle-orm";

import { FORGOT_PASSWORD_TOKEN_EXPIRY_TIME } from "@/lib/constants";
import { db } from "@/lib/db";
import { forgotPasswordTokens } from "@/lib/db/schema";

/**
 * creates and inserts a 6-digit verification token into the database
 *
 */
export const insertForgotPasswordToken = async (email: string) => {
  await db
    .delete(forgotPasswordTokens)
    .where(and(eq(forgotPasswordTokens.identifier, email)));

  const hashedToken = createHash('sha256').update(email + (new Date()).toString()).digest('hex');

  await db.insert(forgotPasswordTokens).values({
    identifier: email,
    token: hashedToken,
    expires: new Date(Date.now() + FORGOT_PASSWORD_TOKEN_EXPIRY_TIME * 1000),
  });

  return hashedToken;
};
