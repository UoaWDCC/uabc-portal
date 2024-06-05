import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { and, eq, gt, gte, lt, lte, or } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db";
import {
  gameSessionExceptions,
  gameSessions,
  gameSessionSchedules,
  semesters,
} from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { getWeekday } from "@/lib/utils";
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
    const gameSessionDate = z.string().date().parse(date);

    const gameSession = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.date, gameSessionDate),
    });

    if (gameSession) {
      // If a game session exists for the date, return it
      return NextResponse.json(gameSession, { status: 200 });
    }

    // Check for a schedule on this weekday
    const semester = await db.query.semesters.findFirst({
      with: {
        gameSessionSchedules: {
          where: eq(gameSessionSchedules.weekday, getWeekday(gameSessionDate)),
        },
      },
      where: or(
        and(
          lte(semesters.startDate, gameSessionDate),
          gt(semesters.breakStart, gameSessionDate),
        ),
        and(
          lt(semesters.breakEnd, gameSessionDate),
          gte(semesters.endDate, gameSessionDate),
        ),
      ),
    });

    const gameSessionSchedule = semester?.gameSessionSchedules[0];

    if (!gameSessionSchedule) {
      // If no game session schedule found for the weekday within the semester, return
      return new Response(null, { status: 204 });
    }

    const gameSessionException = await db.query.gameSessionExceptions.findFirst(
      {
        where: eq(gameSessionExceptions.gameSessionDate, gameSessionDate),
      },
    );

    if (gameSessionSchedule && !gameSessionException) {
      // If schedule found and no exception, return the schedule
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
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const gameSessionToInsert = insertGameSessionSchema.parse(await req.json());

    if (new Date(gameSessionToInsert.date) < new Date()) {
      return new Response("Date cannot be in the past", { status: 400 });
    }

    // Check that a record doesn't already exist for this date
    const gameSession = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.date, gameSessionToInsert.date),
    });

    if (gameSession) {
      return new Response("A game session already exists for this date", {
        status: 400,
      });
    }

    // Check for a schedule on this weekday
    const semester = await db.query.semesters.findFirst({
      with: {
        gameSessionSchedules: {
          where: eq(
            gameSessionSchedules.weekday,
            getWeekday(gameSessionToInsert.date),
          ),
        },
      },
      where: or(
        and(
          lte(semesters.startDate, gameSessionToInsert.date),
          gt(semesters.breakStart, gameSessionToInsert.date),
        ),
        and(
          lt(semesters.breakEnd, gameSessionToInsert.date),
          gte(semesters.endDate, gameSessionToInsert.date),
        ),
      ),
    });

    const gameSessionSchedule = semester?.gameSessionSchedules[0];

    if (gameSessionSchedule) {
      // If a schedule exists, only create record if an exception also exists, otherwise it will be generated
      const gameSessionException =
        await db.query.gameSessionExceptions.findFirst({
          where: eq(
            gameSessionExceptions.gameSessionDate,
            gameSessionToInsert.date,
          ),
        });

      if (!gameSessionException) {
        return new Response("No gameSessionException found for this date", {
          status: 400,
        });
      }
    }

    // Check that the gameSession is valid
    if (gameSessionToInsert.bookingOpen > new Date(gameSessionToInsert.date)) {
      return new Response("Booking open must be before the game session date", {
        status: 400,
      });
    }

    if (gameSessionToInsert.bookingClose > new Date(gameSessionToInsert.date)) {
      return new Response(
        "Booking close must be before the game session date",
        {
          status: 400,
        },
      );
    }

    if (gameSessionToInsert.bookingOpen > gameSessionToInsert.bookingClose) {
      return new Response("Booking open must be before booking close", {
        status: 400,
      });
    }

    if (gameSessionToInsert.startTime > gameSessionToInsert.endTime) {
      return new Response("Start time must be before end time", {
        status: 400,
      });
    }

    if (gameSessionToInsert.casualCapacity > gameSessionToInsert.capacity) {
      return new Response("Casual capacity must be less than capacity", {
        status: 400,
      });
    }

    await db.insert(gameSessions).values(gameSessionToInsert);

    return NextResponse.json(gameSessionToInsert, { status: 201 });
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
    const gameSessionDate = z.string().date().parse(date);

    // Delete the game session if it exists
    const [deletedGameSession] = await db
      .delete(gameSessions)
      .where(eq(gameSessions.date, gameSessionDate))
      .returning();

    if (!deletedGameSession) {
      // Create a gameSessionException record if one doesn't exist
      const gameSessionException =
        await db.query.gameSessionExceptions.findFirst({
          where: eq(gameSessionExceptions.gameSessionDate, gameSessionDate),
        });

      if (gameSessionException) {
        return new Response(
          "A gameSessionException already exists for this date",
          { status: 404 },
        );
      } else {
        const gameSessionExceptionToInsert =
          insertGameSessionExceptionSchema.parse({
            gameSessionDate,
          });

        await db
          .insert(gameSessionExceptions)
          .values(gameSessionExceptionToInsert);
      }
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
    const gameSessionDate = z.string().date().parse(date);

    const body = await req.json();

    const gameSessionToUpdate = updateGameSessionSchema.parse(body);
    const gameSessionToInsert = insertGameSessionSchema.parse(body);

    if (gameSessionToInsert.date !== gameSessionDate) {
      return new Response("Inconsistent dates provided in URL and body", {
        status: 400,
      });
    }

    if (gameSessionToUpdate.startTime > gameSessionToUpdate.endTime) {
      return new Response("Start time must be less than end time", {
        status: 400,
      });
    }

    if (gameSessionToUpdate.casualCapacity > gameSessionToUpdate.capacity) {
      return new Response("Casual capacity must be less than capacity", {
        status: 400,
      });
    }

    // If the game session exists, update it and return
    const [updatedGameSession] = await db
      .update(gameSessions)
      .set(gameSessionToUpdate)
      .where(eq(gameSessions.date, gameSessionDate))
      .returning();

    if (updatedGameSession) {
      return new Response(null, { status: 204 });
    }

    // Check the game session is valid
    if (gameSessionToInsert.bookingOpen > new Date(gameSessionToInsert.date)) {
      return new Response("Booking open must be before the game session date", {
        status: 400,
      });
    }

    if (gameSessionToInsert.bookingClose > new Date(gameSessionToInsert.date)) {
      return new Response(
        "Booking close must be before the game session date",
        {
          status: 400,
        },
      );
    }

    if (gameSessionToInsert.bookingOpen > gameSessionToInsert.bookingClose) {
      return new Response("Booking open must be before booking close", {
        status: 400,
      });
    }

    if (gameSessionToInsert.startTime > gameSessionToInsert.endTime) {
      return new Response("Start time must be before end time", {
        status: 400,
      });
    }

    if (gameSessionToInsert.casualCapacity > gameSessionToInsert.capacity) {
      return new Response("Casual capacity must be less than capacity", {
        status: 400,
      });
    }

    // Create a gameSessionException record if it doesn't exist
    const gameSessionException = await db.query.gameSessionExceptions.findFirst(
      {
        where: eq(gameSessionExceptions.gameSessionDate, gameSessionDate),
      },
    );

    if (gameSessionException) {
      return new Response(
        "A gameSessionException already exists for this date",
        { status: 404 },
      );
    } else {
      const gameSessionExceptionToInsert =
        insertGameSessionExceptionSchema.parse({
          gameSessionDate: gameSessionDate,
        });

      await db
        .insert(gameSessionExceptions)
        .values(gameSessionExceptionToInsert);
    }

    // Create a gameSession record with the updated data and return it
    await db.insert(gameSessions).values(gameSessionToInsert);
    return NextResponse.json(gameSessionToInsert, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
