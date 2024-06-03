import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { and, eq, gte, lte, or } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db";
import {
  gameSessionExceptions,
  gameSessions,
  gameSessionSchedules,
  semesters,
  weekdayEnum,
} from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import {
  insertGameSessionExceptionSchema,
  insertGameSessionSchema,
  updateGameSessionSchema,
} from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const date = req.nextUrl.searchParams.get("date");

    if (!date) {
      return new Response("No date provided in the request", {
        status: 400,
      });
    }

    const gameSessionDate = new Date(date as string);

    if (!gameSessionDate) {
      return new Response("Invalid date provided in the request", {
        status: 400,
      });
    }

    const gameSession = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.date, gameSessionDate),
    });

    if (gameSession) {
      return NextResponse.json(gameSession, { status: 200 });
    }

    const [gameSessionSchedule] = await db
      .select()
      .from(gameSessionSchedules)
      .innerJoin(
        semesters,
        or(
          and(
            gte(semesters.startDate, gameSessionDate),
            lte(semesters.breakStart, gameSessionDate),
          ),
          and(
            gte(semesters.breakEnd, gameSessionDate),
            lte(semesters.endDate, gameSessionDate),
          ),
        ),
      )
      .where(
        eq(
          gameSessionSchedules.weekday,
          weekdayEnum.enumValues[(gameSessionDate.getDay() - 1) % 7],
        ),
      );

    if (!gameSessionSchedule) {
      // No game session schedule found for the given weekday within the semester
      return new Response(null, { status: 204 });
    }

    const gameSessionException = await db.query.gameSessionExceptions.findFirst(
      {
        where: eq(gameSessionExceptions.gameSessionDate, gameSessionDate),
      },
    );

    if (gameSessionSchedule && !gameSessionException) {
      return NextResponse.json(gameSessionSchedule, { status: 200 });
    } else {
      return new Response(null, { status: 204 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}

/**
 * Creates a new game session
 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const body = insertGameSessionSchema.parse(json);

    if (body.date < new Date()) {
      return new Response("Date cannot be in the past", { status: 400 });
    }

    await db.insert(gameSessions).values(body);

    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(error.issues, { status: 400 });

    return new Response(null, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const date = req.nextUrl.searchParams.get("date");

    if (!date) {
      return new Response("No date provided in the request", {
        status: 400,
      });
    }

    const gameSessionDate = new Date(date as string);

    if (!gameSessionDate) {
      return new Response("Invalid date provided in the request", {
        status: 400,
      });
    }

    const [deletedGameSession] = await db
      .delete(gameSessions)
      .where(eq(gameSessions.date, gameSessionDate))
      .returning();

    if (!deletedGameSession) {
      const gameSessionException = insertGameSessionExceptionSchema.parse({
        gameSessionDate: gameSessionDate,
      });
      await db.insert(gameSessionExceptions).values(gameSessionException);
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const date = req.nextUrl.searchParams.get("date");

    if (!date) {
      return new Response("No date provided in the request", {
        status: 400,
      });
    }

    const gameSessionDate = new Date(date as string);

    if (!gameSessionDate) {
      return new Response("Invalid date provided in the request", {
        status: 400,
      });
    }

    const gameSessionUpdate = updateGameSessionSchema.parse(await req.json());

    const [updatedGameSession] = await db
      .update(gameSessions)
      .set(gameSessionUpdate)
      .where(eq(gameSessions.date, gameSessionDate))
      .returning();

    if (updatedGameSession) {
      return new Response(null, { status: 204 });
    }

    // Create a gameSessionException record
    const gameSessionException = insertGameSessionExceptionSchema.parse({
      gameSessionDate: gameSessionDate,
    });
    await db.insert(gameSessionExceptions).values(gameSessionException);

    // Create a gameSession record with the updated data
    const gameSessionInsert = insertGameSessionSchema.parse(await req.json());

    if (gameSessionInsert.startTime > gameSessionInsert.endTime) {
      return new Response("Start time must be less than end time", {
        status: 400,
      });
    }

    if (gameSessionInsert.casualCapacity > gameSessionInsert.capacity) {
      return new Response("Casual capacity must be less than capacity", {
        status: 400,
      });
    }

    await db.insert(gameSessions).values(gameSessionInsert);
    return NextResponse.json(gameSessionInsert, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
