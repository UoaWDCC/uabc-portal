import type { NextRequest } from "next/server";
import { ne } from "drizzle-orm";

import { db } from "@/lib/db";
import { roleEnum, users } from "@/lib/db/schema";
import { adminRouteWrapper } from "@/lib/wrappers";

export const dynamic = "force-dynamic";
export const PATCH = adminRouteWrapper(async (_req: NextRequest) => {
  // We only want to update the membership field to keep their verification status(returning).
  await db
    .update(users)
    .set({ member: false, prepaidSessions: 0 })
    .where(ne(users.role, roleEnum.enumValues[0]))
    // .where(and(eq(users.member, true), ne(users.role, roleEnum.enumValues[0])))
    .catch((error) => {
      console.error(error);
      return new Response(error, { status: 500 });
    });

  return new Response("Purged all members to casuals!", { status: 200 });
});
