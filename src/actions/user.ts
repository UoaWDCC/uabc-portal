"server only";

import { unstable_cache } from "next/cache";
import type { User } from "next-auth";

import { CACHE_REVALIDATION_PERIOD } from "@/lib/constants";
import { db } from "@/lib/db";

export async function getUserFromEmail(
  email: string | null | undefined,
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
          firstName: true,
          lastName: true,
          role: true,
        },
        where: (users, { eq }) => eq(users.email, email as string),
      });
    },

    [`getUserFromEmail:${email}`],
    { tags: [`user-${email}`], revalidate: CACHE_REVALIDATION_PERIOD },
  )();

  return user ?? null;
}
