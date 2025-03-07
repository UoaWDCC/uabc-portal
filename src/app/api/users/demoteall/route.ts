import type { NextRequest } from "next/server";
import { and, eq, ne } from "drizzle-orm";

import { db } from "@/lib/db";
import { roleEnum, users } from "@/lib/db/schema";
import { adminRouteWrapper } from "@/lib/wrappers";

export const dynamic = "force-dynamic";
export const PATCH = adminRouteWrapper(async (_req: NextRequest) => {
  // Need to demote all users that have the membership status and that isn't admin
  await db
    .update(users)
    .set({ member: false })
    .where(and(eq(users.member, true), ne(users.role, roleEnum.enumValues[0])))
    .catch((error) => {
      return new Response(error, { status: 500 });
    });

  return new Response("Purged all members to casuals!", { status: 200 });
});
