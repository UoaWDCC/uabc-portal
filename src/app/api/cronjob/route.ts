import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { addDays, eachDayOfInterval, format, isWithinInterval } from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  gameSessions,
  gameSessionSchedules,
  semesters,
  weekdayEnum,
} from "@/lib/db/schema";
import { insertGameSessionSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    // get current day and reset to 12am
    let now: Date = new Date();
    now = new Date(now.getTime() - (now.getTime() % (3600 * 24 * 1000)));

    // Find current semester
    const activeSemester = await db.query.semesters.findFirst({
      where: and(
        lte(semesters.startDate, format(now, "yyyy-MM-dd")),
        gte(semesters.endDate, format(now, "yyyy-MM-dd")),
      ),
    });

    if (!activeSemester) {
      return NextResponse.json("No active semester found.", { status: 400 });
    }

    if (
      isWithinInterval(now, {
        start: activeSemester.breakStart,
        end: activeSemester.breakEnd,
      })
    ) {
      return NextResponse.json("Currently in semester break period.", {
        status: 400,
      });
    }

    // Find the day of the week that booking opens
    const dayNow = now.getDay();
    const bookingOpenDay = activeSemester.bookingOpenDay;
    let dayNum: number;
    switch (bookingOpenDay) {
      case "Monday":
        dayNum = 1;
        break;
      case "Tuesday":
        dayNum = 2;
        break;
      case "Wednesday":
        dayNum = 3;
        break;
      case "Thursday":
        dayNum = 4;
        break;
      case "Friday":
        dayNum = 5;
        break;
      case "Saturday":
        dayNum = 6;
        break;
      default:
        dayNum = 0;
    }

    let diff: number = dayNum + 7 - dayNow;

    if (diff > 7) {
      diff -= 7;
    }

    // Find the day of the week that booking opens + 7 days (next batch of sessions)
    const startDate = addDays(now, diff);
    const oneWeekFromStart = addDays(startDate, 7);
    const daysOfWeek = eachDayOfInterval({ start: now, end: oneWeekFromStart });

    await db.transaction(async (tx) => {
      // For each day in the session week, create a game session
      for (const day of daysOfWeek) {
        if (day > new Date(activeSemester.endDate)) {
          break;
        }
        const dayOfWeek = day.getDay();

        //check for gameSessionScheduleExceptions and continue if deleted, and if edited then insert that instead and continue

        // Find game session schedule for the day
        const schedule = await tx.query.gameSessionSchedules.findFirst({
          where: and(
            eq(
              gameSessionSchedules.weekday,
              weekdayEnum.enumValues[(dayOfWeek + 1) % 7],
            ),
            eq(gameSessionSchedules.semesterId, activeSemester.id),
          ),
        });

        if (!schedule) {
          continue;
        }

        // Calculate booking close time
        const [hours, mins, secs] = schedule.startTime.split(":").map(Number);
        const bookingClose = new Date(
          day.getTime() + 3600 * 1000 * hours + 60 * 1000 * mins + 1000 * secs,
        );

        const insertSchedule = insertGameSessionSchema.parse({
          bookingOpen: startDate,
          bookingClose: bookingClose,
          gameSessionScheduleId: schedule.id,
          date: day,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          locationName: schedule.locationName,
          locationAddress: schedule.locationAddress,
          capacity: schedule.capacity,
          casualCapacity: schedule.casualCapacity,
        });

        await tx.insert(gameSessions).values(insertSchedule);
      }
    });

    return NextResponse.json(
      "Game sessions for the upcoming week have been created.",
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
