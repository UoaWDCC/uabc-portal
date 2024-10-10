import "server-only";

import { randomInt } from "crypto";
import { revalidateTag, unstable_cache } from "next/cache";
import { and, count, eq, gt } from "drizzle-orm";
import type { User } from "next-auth";

import {
  CACHE_REVALIDATION_PERIOD,
  VERIFICATION_TOKEN_EXPIRY_TIME,
} from "@/lib/constants";
import { db } from "@/lib/db";
import { verificationTokens } from "@/lib/db/schema";
import { RateLimitError } from "@/lib/exceptions";

export async function getUserFromId(userId: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      member: true,
      verified: true,
      prepaidSessions: true,
      playLevel: true,
    },
  });
}

export async function getUserFromEmail(
  email: string | null | undefined
): Promise<User | null> {
  if (!email) {
    return null;
  }

  const user = await unstable_cache(
    async () => {
      return await db.query.users.findFirst({
        columns: {
          id: true,
          email: true,
          member: true,
          verified: true,
          firstName: true,
          lastName: true,
          role: true,
          playLevel: true,
        },
        where: (users, { eq }) => eq(users.email, email as string),
      });
    },

    [`getUserFromEmail:${email}`],
    { tags: [userCache.getTag(email)], revalidate: CACHE_REVALIDATION_PERIOD }
  )();

  return user ?? null;
}

/**
 * creates and inserts a 6-digit verification token into the database
 * if there are already 5 active tokens for the email, it throws an error
 */
export const insertVerificationToken = async (email: string) => {
  const [{ count: activeTokenCount }] = await db
    .select({ count: count() })
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.identifier, email),
        gt(verificationTokens.expires, new Date())
      )
    );

  if (activeTokenCount >= 5) {
    throw new RateLimitError();
  }

  const token = randomInt(100000, 999999);

  await db
    .insert(verificationTokens)
    .values({
      identifier: email,
      token: token.toString(),
      expires: new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY_TIME * 1000),
    })
    .onConflictDoUpdate({
      target: [verificationTokens.identifier, verificationTokens.token],
      set: {
        expires: new Date(Date.now() + VERIFICATION_TOKEN_EXPIRY_TIME * 1000),
      },
    });

  return token;
};

export const userCache = {
  getTag: (email: string) => `user-${email}`,
  revalidate(email: string): void {
    revalidateTag(this.getTag(email));
  },
};
