import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";

/**
 * Get user by id
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
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

    if (!user) {
      return new Response(`No User found for id: ${userId}`, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }

    if (currentUser.id !== userId) {
      return new Response("ERROR: Invalid permissions", { status: 403 });
    }

    const user = await db.delete(users).where(eq(users.id, userId));

    if (!user) {
      return new Response(`No User found for id: ${userId}`, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
