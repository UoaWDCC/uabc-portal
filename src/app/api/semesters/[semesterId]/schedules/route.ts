import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { insertGameSessionScheduleSchema } from "@/lib/validators";
import { adminRouteWrapper } from "@/lib/wrappers";

export const GET = adminRouteWrapper(
  async (_req, { params }: { params: { semesterId: number } }) => {
    const { semesterId } = params;
    const schedules = await db.query.gameSessionSchedules.findMany({
      where: eq(gameSessionSchedules.semesterId, semesterId),
      orderBy: asc(gameSessionSchedules.weekday),
    });

    return NextResponse.json(schedules);
  }
);

export const POST = adminRouteWrapper(
  async (req, { params }: { params: { semesterId: number } }) => {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }
    const { semesterId } = params;
    const newGameSession = insertGameSessionScheduleSchema.parse({
      ...(await req.json()),
      semesterId: semesterId,
    });

    if (newGameSession.startTime >= newGameSession.endTime) {
      return new Response("Start time must be before end time", {
        status: 400,
      });
    }

    const session = await db
      .insert(gameSessionSchedules)
      .values(newGameSession)
      .returning();
    return NextResponse.json(session, { status: 201 });
  }
);
