import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";

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
    const { id } = params;

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, id),
    });

    if (!gameSessionSchedule) {
      return new Response(`No GameSessionSchedule found for id: ${id}`, {
        status: 404,
      });
    }

    await db
      .delete(gameSessionSchedules)
      .where(eq(gameSessionSchedules.id, id));
    return new Response(`Deleted Game Session with id ${id}`, { status: 204 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const { id } = params;

    const updatedGameSession = await req.json();

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, id),
    });

    if (!gameSessionSchedule) {
      return new Response(`No GameSessionSchedule found for id: ${id}`, {
        status: 404,
      });
    }

    await db
      .update(gameSessionSchedules)
      .set(updatedGameSession)
      .where(eq(gameSessionSchedules.id, id));
    return new Response(`Updated Game Session ${id}`, { status: 200 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
