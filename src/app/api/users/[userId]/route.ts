import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { getUserFromId } from "@/services/user";

export async function GET(
  _req: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId } = params;

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }

    if (currentUser.role !== "admin" && currentUser.id !== userId) {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const user = await getUserFromId(userId);

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

    if (currentUser.role !== "admin" && currentUser.id !== userId) {
      return new Response("ERROR: No valid permissions", { status: 403 });
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
