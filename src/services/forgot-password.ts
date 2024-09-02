import "server-only";

import { randomInt } from "crypto";
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

  const token = randomInt(100000, 999999);

  await db.insert(forgotPasswordTokens).values({
    identifier: email,
    token: token.toString(),
    expires: new Date(Date.now() + FORGOT_PASSWORD_TOKEN_EXPIRY_TIME * 1000),
  });
  // .onConflictDoUpdate({
  //   target: [verificationTokens.identifier, verificationTokens.token],
  //   set: {
  //     expires: new Date(Date.now() + FORGOT_PASSWORD_TOKEN_EXPIRY_TIME * 1000),
  //   },
  // });

  return token;
};
