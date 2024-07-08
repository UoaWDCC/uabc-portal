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
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }

    if (currentUser.id !== userId) {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const body = await req.json();

    const { firstName, lastName, member } = updateUserSchema.parse(body);

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return new Response(`No User found for id: ${currentUser.id}`, {
        status: 404,
      });
    }

    await db
      .update(users)
      .set({ firstName, lastName, member })
      .where(eq(users.id, currentUser.id));

    userCache.revalidate(currentUser.email);

    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
