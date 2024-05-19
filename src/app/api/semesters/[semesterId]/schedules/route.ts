import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { insertGameSessionScheduleSchema } from "@/lib/validators";

export async function POST(
  req: NextRequest,
  { params }: { params: { semesterId: number } },
) {
  try {
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
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json((err as z.ZodError).issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { semesterId: number } },
) {
  try {
    const { semesterId } = params;
    const gameSessions = await db.query.gameSessionSchedules.findMany({
      where: eq(gameSessionSchedules.semesterId, semesterId),
    });

    return NextResponse.json(gameSessions);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
