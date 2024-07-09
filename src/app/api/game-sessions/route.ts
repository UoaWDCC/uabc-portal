import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { addDays } from "date-fns";
import { and, eq, gt, gte, lt, lte, or, sql } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db";
import {
  bookingDetails,
  gameSessionExceptions,
  gameSessions,
  gameSessionSchedules,
  semesters,
} from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { formatInNZST, getWeekday } from "@/lib/utils";
import {
  getZonedBookingCloseTime,
  getZonedBookingOpenTime,
} from "@/lib/utils/game-sessions";
import {
  insertGameSessionExceptionSchema,
  insertGameSessionSchema,
  insertNonNullGameSessionExceptionSchema,
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

    const existingGameSession = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.date, gameSessionDate),
    });

    if (existingGameSession) {
      const [{ attendees }] = await db
        .select({ attendees: sql<number>`count(*)` })
        .from(bookingDetails)
        .innerJoin(
          gameSessions,
          eq(bookingDetails.gameSessionId, gameSessions.id)
        )
        .where(eq(gameSessions.date, gameSessionDate));
      // If a game session exists for the date, return it
      return NextResponse.json(
        {
          exists: true,
          canCreate: true,
          data: {
            ...existingGameSession,
            attendees,
          },
        },
        { status: 200 }
      );
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
          gt(semesters.breakStart, gameSessionDate)
        ),
        and(
          lt(semesters.breakEnd, gameSessionDate),
          gte(semesters.endDate, gameSessionDate)
        )
      ),
    });

    if (!semester) {
      return NextResponse.json(
        {
          exists: false,
          canCreate: false,
          message: "No ongoing semester found for this date",
          data: null,
        },
        {
          status: 404,
        }
      );
    }

    const gameSessionSchedule = semester.gameSessionSchedules[0];

    const gameSessionException = await db.query.gameSessionExceptions.findFirst(
      {
        where: eq(gameSessionExceptions.date, gameSessionDate),
      }
    );

    const bookingOpen = getZonedBookingOpenTime({
      bookingOpenDay: semester.bookingOpenDay,
      bookingOpenTime: semester.bookingOpenTime,
      gameSessionDate,
    });

    if (gameSessionException?.isDeleted) {
      return NextResponse.json(
        {
          exists: false,
          canCreate: true,
          message: "No game session found for this date",
          data: {
            semesterName: semester.name,
            bookingOpen,
          },
        },
        {
          status: 404,
        }
      );
    }

    if (gameSessionException && !gameSessionException.isDeleted) {
      return NextResponse.json(
        {
          exists: true,
          canCreate: true,
          data: {
            date: gameSessionDate,
            semesterName: semester.name,
            gameSessionScheduleId: null,
            bookingOpen,
            bookingClose: getZonedBookingCloseTime({
              gameSessionDate,
              gameSessionStartTime: gameSessionException.startTime!,
            }),
            startTime: gameSessionException.startTime,
            endTime: gameSessionException.endTime,
            locationName: gameSessionException.locationName,
            locationAddress: gameSessionException.locationAddress,
            capacity: gameSessionException.capacity,
            casualCapacity: gameSessionException.casualCapacity,
            attendees: 0,
          },
        },
        { status: 200 }
      );
    }

    if (!gameSessionSchedule) {
      return NextResponse.json(
        {
          exists: false,
          canCreate: true,
          message: "No game session found for this date",
          data: {
            semesterName: semester.name,
            bookingOpen,
          },
        },
        {
          status: 404,
        }
      );
    }

    // If schedule found and no exception, return a gameSession-like object
    return NextResponse.json(
      {
        exists: true,
        canCreate: true,
        data: {
          date: gameSessionDate,
          semesterName: semester.name,
          gameSessionScheduleId: null,
          bookingOpen,
          bookingClose: getZonedBookingCloseTime({
            gameSessionDate,
            gameSessionStartTime: gameSessionSchedule.startTime,
          }),
          startTime: gameSessionSchedule.startTime,
          endTime: gameSessionSchedule.endTime,
          locationName: gameSessionSchedule.locationName,
          locationAddress: gameSessionSchedule.locationAddress,
          capacity: gameSessionSchedule.capacity,
          casualCapacity: gameSessionSchedule.casualCapacity,
          attendees: 0,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const body = await req.json();

    const gameSessionExceptionToInsert =
      insertNonNullGameSessionExceptionSchema.parse({
        ...body,
        isDeleted: false,
      });

    const gameSessionDate = gameSessionExceptionToInsert.date;

    if (gameSessionDate < formatInNZST(new Date())) {
      return new Response("Date cannot be in the past", { status: 400 });
    }

    if (
      gameSessionExceptionToInsert.startTime >
      gameSessionExceptionToInsert.endTime
    ) {
      return new Response("Start time must be before end time", {
        status: 400,
      });
    }

    if (
      gameSessionExceptionToInsert.casualCapacity >
      gameSessionExceptionToInsert.capacity
    ) {
      return new Response("Casual capacity must be less than capacity", {
        status: 400,
      });
    }

    // Check that a record doesn't already exist for this date
    const existingGameSession = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.date, gameSessionDate),
    });

    if (existingGameSession) {
      return new Response("A game session already exists for this date", {
        status: 400,
      });
    }

    if (new Date(gameSessionDate) < addDays(new Date(), 7)) {
      const gameSessionToInsert = insertGameSessionSchema.parse(body);

      await db.insert(gameSessions).values(gameSessionToInsert);

      return NextResponse.json(gameSessionToInsert, { status: 201 });
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
          gt(semesters.breakStart, gameSessionDate)
        ),
        and(
          lt(semesters.breakEnd, gameSessionDate),
          gte(semesters.endDate, gameSessionDate)
        )
      ),
    });

    if (!semester) {
      return new Response("No semester found for this date", { status: 404 });
    }

    const gameSessionSchedule = semester?.gameSessionSchedules[0];

    const gameSessionException = await db.query.gameSessionExceptions.findFirst(
      {
        where: eq(gameSessionExceptions.date, gameSessionDate),
      }
    );

    // If a schedule exists and (no exception or exception is not a delete exception)
    if (gameSessionSchedule && !gameSessionException?.isDeleted) {
      return new Response("A game session already exists for this date", {
        status: 400,
      });
    }

    // If a schedule doesn't exist and (exception is not a delete exception)
    if (
      !gameSessionSchedule &&
      gameSessionException &&
      !gameSessionException.isDeleted
    ) {
      return new Response("Game session already exists for this date", {
        status: 400,
      });
    }

    await db
      .insert(gameSessionExceptions)
      .values(gameSessionExceptionToInsert)
      .onConflictDoUpdate({
        target: [gameSessionExceptions.date],
        set: gameSessionExceptionToInsert,
      });

    return NextResponse.json(gameSessionExceptionToInsert, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    console.error(error);
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

    if (deletedGameSession) {
      return new Response(null, { status: 204 });
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
          gt(semesters.breakStart, gameSessionDate)
        ),
        and(
          lt(semesters.breakEnd, gameSessionDate),
          gte(semesters.endDate, gameSessionDate)
        )
      ),
    });

    const gameSessionSchedule = semester?.gameSessionSchedules[0];

    // Create a gameSessionException record if one doesn't exist
    const gameSessionException = await db.query.gameSessionExceptions.findFirst(
      {
        where: eq(gameSessionExceptions.date, gameSessionDate),
      }
    );

    if (!!gameSessionException?.isDeleted) {
      return new Response("A gameSession does not exist for this date", {
        status: 404,
      });
    }

    // If a schedule doesn't exist and (no exception or exception is a delete exception)
    if (
      !gameSessionSchedule &&
      (!gameSessionException || gameSessionException.isDeleted)
    ) {
      return new Response("A gameSession does not exist for this date", {
        status: 404,
      });
    }

    const gameSessionExceptionToInsert = insertGameSessionExceptionSchema.parse(
      {
        isDeleted: true,
        date: gameSessionDate,
      }
    );

    await db
      .insert(gameSessionExceptions)
      .values(gameSessionExceptionToInsert)
      .onConflictDoUpdate({
        target: [gameSessionExceptions.date],
        set: gameSessionExceptionToInsert,
      });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    console.error(error);
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

    const gameSessionToUpdate = updateGameSessionSchema.parse(await req.json());

    // Check the game session to update is valid
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

    // Find the semester that the date is in
    const semester = await db.query.semesters.findFirst({
      with: {
        gameSessionSchedules: {
          where: eq(gameSessionSchedules.weekday, getWeekday(gameSessionDate)),
        },
      },
      where: or(
        and(
          lte(semesters.startDate, gameSessionDate),
          gt(semesters.breakStart, gameSessionDate)
        ),
        and(
          lt(semesters.breakEnd, gameSessionDate),
          gte(semesters.endDate, gameSessionDate)
        )
      ),
    });

    const gameSessionSchedule = semester?.gameSessionSchedules[0];

    const gameSessionException = await db.query.gameSessionExceptions.findFirst(
      {
        where: eq(gameSessionExceptions.date, gameSessionDate),
      }
    );

    // If a delete exception exists
    if (!!gameSessionException?.isDeleted) {
      return new Response("A gameSession does not exist for this date", {
        status: 404,
      });
    }

    // Now either gameSessionException doesn't exist, or it exists and isn't a delete exception

    // If a schedule doesn't exist and (no exception or exception is a delete exception)
    if (
      !gameSessionSchedule &&
      (!gameSessionException || gameSessionException.isDeleted)
    ) {
      return new Response("A gameSession does not exist for this date", {
        status: 404,
      });
    }

    const gameSessionExceptionToInsert = insertGameSessionExceptionSchema.parse(
      { ...gameSessionToUpdate, date: gameSessionDate }
    );

    // Insert the gameSessionException record
    await db
      .insert(gameSessionExceptions)
      .values(gameSessionExceptionToInsert)
      .onConflictDoUpdate({
        target: [gameSessionExceptions.date],
        set: gameSessionExceptionToInsert,
      });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
