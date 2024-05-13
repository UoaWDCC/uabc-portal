import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { updateGameSessionScheduleSchema } from "@/lib/validators";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const { id } = params;

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, id),
    });

    if (!gameSessionSchedule) {
      return new Response(`No GameSessionSchedule found for id: ${id}`, {
        status: 404,
      });
    }

    return NextResponse.json(gameSessionSchedule);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { id } = params;

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, id),
    });

    if (!gameSessionSchedule) {
      return new Response(`No GameSessionSchedule found for id: ${id}`, {
        status: 400,
      });
    }

    await db
      .delete(gameSessionSchedules)
      .where(eq(gameSessionSchedules.id, id));
    return new Response(null, { status: 204 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { id } = params;

    const updatedGameSession = updateGameSessionScheduleSchema.parse(
      await req.json(),
    );
    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, id),
    });

    if (!gameSessionSchedule) {
      return new Response(`No GameSessionSchedule found for id: ${id}`, {
        status: 400,
      });
    }

    const res = await db
      .update(gameSessionSchedules)
      .set(updatedGameSession)
      .where(eq(gameSessionSchedules.id, id))
      .returning();
    return NextResponse.json(res);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid body", { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
