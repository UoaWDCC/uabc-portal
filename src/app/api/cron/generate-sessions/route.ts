import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  addDays,
  eachDayOfInterval,
  format,
  interval,
  isWithinInterval,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { and, eq, gte, lte } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  gameSessionExceptions,
  gameSessions,
  gameSessionSchedules,
  semesters,
} from "@/lib/db/schema";
import { getWeekday } from "@/lib/utils";
import { clampInterval } from "@/lib/utils/dates";
import {
  getZonedBookingCloseTime,
  getZonedBookingOpenTime,
} from "@/lib/utils/game-sessions";
import { insertGameSessionSchema } from "@/lib/validators";

export async function POST(_req: NextRequest) {
  try {
    // get current time standardised to NZ time
    const now = toZonedTime(Date.now(), "Pacific/Auckland");

    // Find current semester
    const activeSemester = await db.query.semesters.findFirst({
      where: and(
        lte(semesters.startDate, format(addDays(now, 7), "yyyy-MM-dd")),
        gte(semesters.endDate, format(now, "yyyy-MM-dd"))
      ),
    });

    if (!activeSemester) {
      return NextResponse.json("No active semester found.", { status: 400 });
    }

    const semesterInterval = interval(
      activeSemester.startDate,
      activeSemester.endDate
    );

    const semesterBreakInterval = interval(
      activeSemester.breakStart,
      activeSemester.breakEnd
    );

    const nextBookingOpen = addDays(
      getZonedBookingOpenTime({
        bookingOpenDay: activeSemester.bookingOpenDay,
        bookingOpenTime: activeSemester.bookingOpenTime,
        gameSessionDate: format(now, "yyyy-MM-dd"),
      }),
      7
    );

    // from today to 6 days after the next booking open day
    const creationInterval = clampInterval(
      semesterInterval,
      interval(now, addDays(nextBookingOpen, 6))
    );

    const gameSessionsToInsert: (typeof gameSessions.$inferInsert)[] = [];

    // For each day in the session week, create a game session
    for (const day of eachDayOfInterval(creationInterval)) {
      if (isWithinInterval(day, semesterBreakInterval)) continue;

      const bookingOpen = getZonedBookingOpenTime({
        bookingOpenDay: activeSemester.bookingOpenDay,
        bookingOpenTime: activeSemester.bookingOpenTime,
        gameSessionDate: format(day, "yyyy-MM-dd"),
      });

      //check for gameSessionScheduleExceptions and continue if deleted, and if edited then insert that instead and continue
      const exception = await db.query.gameSessionExceptions.findFirst({
        where: eq(gameSessionExceptions.date, format(day, "yyyy-MM-dd")),
      });

      if (exception?.isDeleted) continue;

      if (exception) {
        const bookingClose = getZonedBookingCloseTime({
          gameSessionStartTime: exception.startTime!,
          gameSessionDate: format(day, "yyyy-MM-dd"),
        });

        gameSessionsToInsert.push(
          insertGameSessionSchema.parse({
            bookingOpen,
            bookingClose,
            date: format(day, "yyyy-MM-dd"),
            startTime: exception.startTime,
            endTime: exception.endTime,
            locationName: exception.locationName,
            locationAddress: exception.locationAddress,
            capacity: exception.capacity,
            casualCapacity: exception.casualCapacity,
          })
        );
        continue;
      }

      // Find game session schedule for the day
      const schedule = await db.query.gameSessionSchedules.findFirst({
        where: and(
          eq(gameSessionSchedules.weekday, getWeekday(day)),
          eq(gameSessionSchedules.semesterId, activeSemester.id)
        ),
      });

      if (!schedule) continue;

      const bookingClose = getZonedBookingCloseTime({
        gameSessionStartTime: schedule.startTime,
        gameSessionDate: format(day, "yyyy-MM-dd"),
      });

      gameSessionsToInsert.push(
        insertGameSessionSchema.parse({
          bookingOpen,
          bookingClose,
          gameSessionScheduleId: schedule.id,
          date: format(day, "yyyy-MM-dd"),
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          locationName: schedule.locationName,
          locationAddress: schedule.locationAddress,
          capacity: schedule.capacity,
          casualCapacity: schedule.casualCapacity,
        })
      );
    }

    const insertedGameSessions = await db
      .insert(gameSessions)
      .values(gameSessionsToInsert)
      .onConflictDoNothing()
      .returning();

    return NextResponse.json(insertedGameSessions, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
