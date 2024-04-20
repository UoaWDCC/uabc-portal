import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { updateUserSchema } from "@/lib/validators";

/**
 * Get user by id
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      return new Response(`No User found for id: ${id}`, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

/**
 * PATCH function that updates a user's details
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  // Validate the body of the request
  const json = await req.json();
  const bodyResult = updateUserSchema.safeParse(json);

  if (!bodyResult.success) {
    return NextResponse.json(bodyResult.error, { status: 400 });
  }

  const { firstName, lastName, member } = bodyResult.data;

  // Check that the current user is defined
  const currentUser = await getCurrentUser();
  if (!currentUser || id !== currentUser.id) {
    return new Response(null, { status: 403 });
  }

  // Get the user from the database
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  // Check that the user was found in the database
  if (!user) {
    return new Response(`No User found for id: ${currentUser.id}`, {
      status: 404,
    });
  }

  // Update the user in the database
  await db
    .update(users)
    .set({ firstName, lastName, member })
    .where(eq(users.id, currentUser.id));

  // Revalidate the user tag
  revalidateTag(`user-${currentUser.email}`);

  return new Response(null, {
    status: 204,
  });
}
