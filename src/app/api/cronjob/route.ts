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
import { getWeekday } from "@/lib/utils";
import { insertGameSessionSchema } from "@/lib/validators";
import { Weekday } from "@/types/types";

export async function POST(req: NextRequest) {
  try {
    // get current day, correct to NZ timezone and reset to 12am
    let now: Date = new Date();
    now = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    now = new Date(now.getTime() - (now.getTime() % (3600 * 24 * 1000)));

    // Testing date
    //now = new Date(2024, 1, 21);
    //now = new Date(2024, 1, 22);
    //now = new Date(2024, 2, 28);
    //now = new Date(2024, 2, 29);
    //now = new Date(2024, 3, 7);
    //now = new Date(2024, 3, 8);
    //now = new Date(2024,5,24);
    //now = new Date(2024,5,25);
    //now = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    //console.log(now);

    const currentDateUTC = new Date(
      now.getTime() + now.getTimezoneOffset() * 60000,
    );

    // Find current semester
    const activeSemester = await db.query.semesters.findFirst({
      where: and(
        lte(
          semesters.startDate,
          format(addDays(currentDateUTC, 7), "yyyy-MM-dd"),
        ),
        gte(semesters.endDate, format(currentDateUTC, "yyyy-MM-dd")),
      ),
    });

    if (!activeSemester) {
      return NextResponse.json("No active semester found.", { status: 400 });
    }

    //const semesterStartDate = new Date(activeSemester.startDate);
    const semesterEndDate = new Date(activeSemester.endDate);
    const semesterBreakStart = new Date(activeSemester.breakStart);
    const semesterBreakEnd = new Date(activeSemester.breakEnd);
    const bookingOpenDay = activeSemester.bookingOpenDay;
    const diff = findDiff(now, bookingOpenDay);
    const startDate = addDays(currentDateUTC, diff);

    // Check if the next batch of sessions is within the semester break or after the end of semester
    if (startDate > semesterEndDate) {
      return NextResponse.json(
        "No sessions were generated as they are all after the semester end date.",
        {
          status: 400,
        },
      );
    }

    if (
      addDays(startDate, 6) <= semesterBreakEnd &&
      startDate >= semesterBreakStart
    ) {
      return NextResponse.json(
        "No sessions were generated as they are all within the semester break.",
        {
          status: 400,
        },
      );
    }

    await db.transaction(async (tx) => {
      // For each day in the session week, create a game session
      for (let i: number = 0; i < 7; i++) {
        const day = addDays(startDate, i);

        if (day > semesterEndDate) {
          break;
        }

        if (day >= semesterBreakStart && day <= semesterBreakEnd) {
          continue;
        }

        //check for gameSessionScheduleExceptions and continue if deleted, and if edited then insert that instead and continue

        // Find game session schedule for the day
        const schedule = await tx.query.gameSessionSchedules.findFirst({
          where: and(
            eq(gameSessionSchedules.weekday, getWeekday(day)),
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
          date: format(day, "yyyy-MM-dd"),
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

function findDiff(now: Date, bookingOpenDay: Weekday): number {
  const dayNow = now.getDay();
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

  return diff;
}
