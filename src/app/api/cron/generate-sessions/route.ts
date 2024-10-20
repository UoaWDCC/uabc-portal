import { headers } from "next/headers";
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

import { env } from "@/env";
import { responses } from "@/lib/api/responses";
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
import { routeWrapper } from "@/lib/wrappers";
import { getOrCreateBookingPeriod } from "@/services/game-sessions";

export const dynamic = "force-dynamic";

export const POST = routeWrapper(async () => {
  const headersList = headers();
  const apiKey = headersList.get("x-api-key");

  if (!apiKey || apiKey !== env.CRON_SECRET) {
    return responses.notAuthenticated();
  }

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
    return responses.badRequest({
      message: "No active semester found.",
    });
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

    const bookingPeriod = await getOrCreateBookingPeriod({
      semesterId: activeSemester.id,
      bookingOpenTime: getZonedBookingOpenTime({
        bookingOpenDay: activeSemester.bookingOpenDay,
        bookingOpenTime: activeSemester.bookingOpenTime,
        gameSessionDate: day,
      }),
      bookingCloseTime: getZonedBookingCloseTime(day),
    });

    //check for gameSessionScheduleExceptions and continue if deleted, and if edited then insert that instead and continue
    const exception = await db.query.gameSessionExceptions.findFirst({
      where: eq(gameSessionExceptions.date, format(day, "yyyy-MM-dd")),
    });

    if (exception?.isDeleted) continue;

    if (exception) {
      gameSessionsToInsert.push(
        insertGameSessionSchema.parse({
          date: format(day, "yyyy-MM-dd"),
          startTime: exception.startTime,
          endTime: exception.endTime,
          locationName: exception.locationName,
          locationAddress: exception.locationAddress,
          memberCapacity: exception.memberCapacity,
          casualCapacity: exception.casualCapacity,
          bookingPeriodId: bookingPeriod.id,
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

    gameSessionsToInsert.push(
      insertGameSessionSchema.parse({
        gameSessionScheduleId: schedule.id,
        date: format(day, "yyyy-MM-dd"),
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        locationName: schedule.locationName,
        locationAddress: schedule.locationAddress,
        memberCapacity: schedule.memberCapacity,
        casualCapacity: schedule.casualCapacity,
        bookingPeriodId: bookingPeriod.id,
      })
    );
  }

  if (gameSessionsToInsert.length === 0) {
    return responses.success({ message: "No game sessions to insert" });
  }

  const insertedGameSessions = await db
    .insert(gameSessions)
    .values(gameSessionsToInsert)
    .onConflictDoNothing()
    .returning();

  return NextResponse.json(insertedGameSessions, { status: 201 });
});
