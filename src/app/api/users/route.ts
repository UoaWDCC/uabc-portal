import { NextResponse } from "next/server";
import type { SQL } from "drizzle-orm";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { adminRouteWrapper } from "@/lib/wrappers";

const getSearchParamsSchema = z.object({
  verified: z
    .string()
    .toLowerCase()
    .optional()
    .transform((x) => {
      if (x === "true") return true;
      if (x === "false") return false;
      return undefined;
    })
    .pipe(z.boolean().optional()),
  member: z
    .string()
    .toLowerCase()
    .optional()
    .transform((x) => {
      if (x === "true") return true;
      if (x === "false") return false;
    })
    .pipe(z.boolean().optional()),
});

export const GET = adminRouteWrapper(async (req) => {
  const searchParams = getSearchParamsSchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );

  const paramToUserProp = {
    verified: users.verified,
    member: users.member,
  };

  const userEqConditions: SQL<unknown>[] = [];

  Object.entries(searchParams).forEach(([key, value]) => {
    const userProp = paramToUserProp[key as keyof typeof paramToUserProp];
    if (userProp !== undefined && value !== undefined) {
      userEqConditions.push(eq(userProp, value));
    }
  });

  const fetchedUsers = await db.query.users.findMany({
    where: and(...userEqConditions),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return NextResponse.json(fetchedUsers);
});
