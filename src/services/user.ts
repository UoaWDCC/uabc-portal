import "server-only";

import { revalidateTag, unstable_cache } from "next/cache";
import type { User } from "next-auth";

import { CACHE_REVALIDATION_PERIOD } from "@/lib/constants";
import { db } from "@/lib/db";

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
      remainingSessions: true,
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
        },
        where: (users, { eq }) => eq(users.email, email as string),
      });
    },

    [`getUserFromEmail:${email}`],
    { tags: [userCache.getTag(email)], revalidate: CACHE_REVALIDATION_PERIOD }
  )();

  return user ?? null;
}

export const userCache = {
  getTag: (email: string) => `user-${email}`,
  revalidate(email: string): void {
    revalidateTag(this.getTag(email));
  },
};
