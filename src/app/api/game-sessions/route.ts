import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parse } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
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

    const existingGameSession = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.date, gameSessionDate),
    });

    if (existingGameSession) {
      // If a game session exists for the date, return it
      return NextResponse.json(existingGameSession, { status: 200 });
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

    if (gameSessionException) {
      return new Response(null, { status: 204 });
    }
    // If schedule found and no exception, return the schedule
    return NextResponse.json(gameSessionSchedule, { status: 200 });
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

    const body = await req.json();
    const gameSessionDate = z.string().date().parse(body.date);

    if (new Date(gameSessionDate) < new Date()) {
      return new Response("Date cannot be in the past", { status: 400 });
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

    // Find the semester that the date is in
    const semester = await db.query.semesters.findFirst({
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

    if (!semester) {
      return new Response("No semester found for this date", { status: 400 });
    }

    // Calculate the booking open and close times and convert to NZ Standard Time
    let bookingOpen = parse(
      `${semester.bookingOpenDay} ${semester.bookingOpenTime}`,
      "iiii HH:mm:ss",
      new Date(gameSessionDate),
    );

    // If the booking open time is after the game session date, set it back a week
    if (bookingOpen > new Date(gameSessionDate)) {
      bookingOpen.setDate(bookingOpen.getDate() - 7);
    }

    bookingOpen = fromZonedTime(bookingOpen, "Pacific/Auckland");

    let bookingClose = parse(
      `${gameSessionDate} ${z.string().time().parse(body.startTime)}`,
      "yyyy-MM-dd HH:mm:ss",
      new Date(gameSessionDate),
    );

    bookingClose = fromZonedTime(bookingClose, "Pacific/Auckland");

    const gameSessionToInsert = insertGameSessionSchema.parse({
      ...body,
      bookingOpen: bookingOpen,
      bookingClose: bookingClose,
    });

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

    // Check for a schedule on this weekday
    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: and(
        eq(gameSessionSchedules.semesterId, semester.id),
        eq(gameSessionSchedules.weekday, getWeekday(gameSessionToInsert.date)),
      ),
    });

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
      }
      const gameSessionExceptionToInsert =
        insertGameSessionExceptionSchema.parse({
          gameSessionDate,
        });

      await db
        .insert(gameSessionExceptions)
        .values(gameSessionExceptionToInsert);
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

    // Find the semester that the date is in
    const semester = await db.query.semesters.findFirst({
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

    if (!semester) {
      return new Response("No semester found for this date", { status: 400 });
    }

    // Calculate the booking open and close times and convert to NZ Standard Time
    let bookingOpen = parse(
      `${semester.bookingOpenDay} ${semester.bookingOpenTime}`,
      "iiii HH:mm:ss",
      new Date(gameSessionDate),
    );

    // If the booking open time is after the game session date, set it back a week
    if (bookingOpen > new Date(gameSessionDate)) {
      bookingOpen.setDate(bookingOpen.getDate() - 7);
    }

    bookingOpen = fromZonedTime(bookingOpen, "Pacific/Auckland");

    let bookingClose = parse(
      `${gameSessionDate} ${gameSessionToUpdate.startTime}`,
      "yyyy-MM-dd HH:mm:ss",
      new Date(gameSessionDate),
    );

    bookingClose = fromZonedTime(bookingClose, "Pacific/Auckland");

    const gameSessionToInsert = insertGameSessionSchema.parse({
      ...gameSessionToUpdate,
      date: gameSessionDate,
      bookingOpen: bookingOpen,
      bookingClose: bookingClose,
    });

    // If the game session exists, update it and return
    const [updatedGameSession] = await db
      .update(gameSessions)
      .set(gameSessionToUpdate)
      .where(eq(gameSessions.date, gameSessionDate))
      .returning();

    if (updatedGameSession) {
      return new Response(null, { status: 204 });
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
    }

    const gameSessionExceptionToInsert = insertGameSessionExceptionSchema.parse(
      {
        gameSessionDate: gameSessionDate,
      },
    );

    await db.transaction(async (db) => {
      // Insert the gameSessionException record
      await db
        .insert(gameSessionExceptions)
        .values(gameSessionExceptionToInsert);

      // Create a gameSession record with the updated data and return it
      await db.insert(gameSessions).values(gameSessionToInsert);
    });
    return NextResponse.json(gameSessionToInsert, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
