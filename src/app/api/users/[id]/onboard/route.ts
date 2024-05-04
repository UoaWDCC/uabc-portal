import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { updateUserSchema } from "@/lib/validators";
import { userCache } from "@/services/user";

/**
 * PATCH function that updates a user's details
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // Validate the body of the request
    const json = await req.json();

    const { firstName, lastName, member } = updateUserSchema.parse(json);

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
    userCache.revalidate(currentUser.email);

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(error.issues, { status: 400 });
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
