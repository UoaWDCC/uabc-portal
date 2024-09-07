import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { userRouteWrapper } from "@/lib/wrappers";
import { getUserFromId } from "@/services/user";

export const GET = userRouteWrapper(
  async (_req, { params }: { params: { userId: string } }, currentUser) => {
    const { userId } = params;

    if (currentUser.role !== "admin" && currentUser.id !== userId) {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const user = await getUserFromId(userId);

    if (!user) {
      return new Response(`No User found for id: ${userId}`, { status: 404 });
    }

    return NextResponse.json(user);
  }
);

export const DELETE = userRouteWrapper(
  async (_req, { params }: { params: { userId: string } }, currentUser) => {
    const { userId } = params;

    if (currentUser.role !== "admin" && currentUser.id !== userId) {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const user = await db.delete(users).where(eq(users.id, userId));

    if (!user) {
      return new Response(`No User found for id: ${userId}`, { status: 404 });
    }

    return new Response(null, { status: 204 });
  }
);
