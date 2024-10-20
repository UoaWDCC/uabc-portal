import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { updateUserSchema } from "@/lib/validators";
import { userRouteWrapper } from "@/lib/wrappers";
import { getUserFromId } from "@/services/user";

export const dynamic = "force-dynamic";

export const GET = userRouteWrapper(
  async (_req, { params }: { params: { userId: string } }, currentUser) => {
    const { userId } = params;

    if (currentUser.role !== "admin" && currentUser.id !== userId) {
      return responses.forbidden();
    }

    const user = await getUserFromId(userId);

    if (!user) {
      return responses.notFound({
        resourceType: "user",
        resourceId: userId,
      });
    }

    return NextResponse.json(user);
  }
);

export const DELETE = userRouteWrapper(
  async (_req, { params }: { params: { userId: string } }, currentUser) => {
    const { userId } = params;

    if (currentUser.role !== "admin" && currentUser.id !== userId) {
      return responses.forbidden();
    }

    const user = await db.delete(users).where(eq(users.id, userId));

    if (!user) {
      return responses.notFound({
        resourceType: "user",
        resourceId: userId,
      });
    }

    return responses.success();
  }
);

export const PATCH = userRouteWrapper(
  async (req, { params }: { params: { userId: string } }, currentUser) => {
    const { userId } = params;

    if (currentUser.role !== "admin" && currentUser.id !== userId) {
      return responses.forbidden();
    }

    const body = await req.json();

    const { firstName, lastName, playLevel } = updateUserSchema.parse(body);

    const [user] = await db
      .update(users)
      .set({
        firstName: firstName,
        lastName: lastName,
        playLevel: playLevel,
      })
      .where(eq(users.id, userId))
      .returning();

    if (!user) {
      return responses.notFound({
        resourceType: "user",
        resourceId: userId,
      });
    }

    return NextResponse.json(user);
  }
);
