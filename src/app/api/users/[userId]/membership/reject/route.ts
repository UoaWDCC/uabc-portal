import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { userCache } from "@/services/user";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return new Response("ERROR: Unauthorized request", { status: 401 });
  }

  if (currentUser.role !== "admin") {
    return new Response("ERROR: No valid permissions", { status: 403 });
  }

  const { userId } = params;

  const [user] = await db
    .update(users)
    .set({ member: false })
    .where(eq(users.id, userId))
    .returning();

  if (!user) {
    return new Response(`No user found with id: ${userId}`, {
      status: 404,
    });
  }

  userCache.revalidate(user.email);

  // TODO: Send email to user

  return new Response(null, { status: 204 });
}
