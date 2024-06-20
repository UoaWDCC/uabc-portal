import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from "date-fns";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { updateGameSessionScheduleSchema } from "@/lib/validators";

export async function GET(
  _req: NextRequest,
  { params }: { params: { scheduleId: number } },
) {
  try {
    const { scheduleId } = params;

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, scheduleId),
    });

    if (!gameSessionSchedule) {
      return new Response(
        `No GameSessionSchedule found for id: ${scheduleId}`,
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(gameSessionSchedule);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { scheduleId: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { scheduleId } = params;

    const updatedGameSession = updateGameSessionScheduleSchema.parse(
      await req.json(),
    );
    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, scheduleId),
    });

    if (!gameSessionSchedule) {
      return new Response(
        `No GameSessionSchedule found for id: ${scheduleId}`,
        {
          status: 400,
        },
      );
    }

    const parsedStartTime = parse(
      updatedGameSession.startTime,
      "dd/MM/yyyy",
      new Date(),
    );
    const parsedEndTime = parse(
      updatedGameSession.startTime,
      "dd/MM/yyyy",
      new Date(),
    );
    if (parsedStartTime >= parsedEndTime) {
      console.log("parsedStartTime >= parsedEndTime");
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
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json((err as z.ZodError).issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { scheduleId: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { scheduleId } = params;

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, scheduleId),
    });

    if (!gameSessionSchedule) {
      return new Response(
        `No GameSessionSchedule found for id: ${scheduleId}`,
        {
          status: 400,
        },
      );
    }

    await db
      .delete(gameSessionSchedules)
      .where(eq(gameSessionSchedules.id, scheduleId));
    return new Response(null, { status: 204 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
