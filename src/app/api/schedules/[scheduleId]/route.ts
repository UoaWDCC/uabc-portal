import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { updateGameSessionScheduleSchema } from "@/lib/validators";
import { adminRouteWrapper } from "@/lib/wrappers";

export const GET = adminRouteWrapper(
  async (_req, { params }: { params: { scheduleId: number } }) => {
    const { scheduleId } = params;

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, scheduleId),
    });

    if (!gameSessionSchedule) {
      return new Response(
        `No GameSessionSchedule found for id: ${scheduleId}`,
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(gameSessionSchedule);
  }
);

export const PUT = adminRouteWrapper(
  async (req, { params }: { params: { scheduleId: number } }) => {
    const { scheduleId } = params;

    const updatedGameSession = updateGameSessionScheduleSchema.parse(
      await req.json()
    );
    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, scheduleId),
    });

    if (!gameSessionSchedule) {
      return new Response(
        `No GameSessionSchedule found for id: ${scheduleId}`,
        {
          status: 400,
        }
      );
    }

    if (updatedGameSession.startTime >= updatedGameSession.endTime) {
      return new Response("Start time must be before end time", {
        status: 400,
      });
    }

    const res = await db
      .update(gameSessionSchedules)
      .set(updatedGameSession)
      .where(eq(gameSessionSchedules.id, scheduleId))
      .returning();
    return NextResponse.json(res);
  }
);

export const DELETE = adminRouteWrapper(
  async (_req, { params }: { params: { scheduleId: number } }) => {
    const { scheduleId } = params;

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, scheduleId),
    });

    if (!gameSessionSchedule) {
      return new Response(
        `No GameSessionSchedule found for id: ${scheduleId}`,
        {
          status: 400,
        }
      );
    }

    await db
      .delete(gameSessionSchedules)
      .where(eq(gameSessionSchedules.id, scheduleId));
    return new Response(null, { status: 204 });
  }
);
