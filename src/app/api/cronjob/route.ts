import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  addDays,
  eachDayOfInterval,
  format,
  isWithinInterval,
  subDays,
} from "date-fns";
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
    const now = new Date();
    const oneWeekFromNow = addDays(now, 7);

    const activeSemester = await db.query.semesters.findFirst({
      where: and(
        lte(semesters.startDate, format(now, "yyyy-mm-dd")),
        gte(semesters.endDate, format(now, "yyyy-mm-dd")),
      ),
    });

    if (!activeSemester) {
      return NextResponse.json("No active semester found.", { status: 400 });
    }

    if (
      activeSemester.breakStart &&
      activeSemester.breakEnd &&
      isWithinInterval(now, {
        start: activeSemester.breakStart,
        end: activeSemester.breakEnd,
      })
    ) {
      return NextResponse.json("Currently in semester break period.", {
        status: 400,
      });
    }

    const daysOfWeek = eachDayOfInterval({ start: now, end: oneWeekFromNow });

    await db.transaction(async (tx) => {
      for (const day of daysOfWeek) {
        const dayOfWeek = day.getDay();

        //check for gameSessionScheduleExceptions and continue if deleted, and if edited then insert that instead and continue

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

        const insertSchedule = insertGameSessionSchema.parse({
          bookingOpen: subDays(day, 2), //placeholder
          bookingClose: subDays(day, 1), //placeholder
          gameSessionScheduleId: schedule.id,
          date: day,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          locationName: schedule.locationName,
          locationAddress: schedule.locationAddress,
          capacity: schedule.capacity,
          casualCapacity: schedule.casualCapacity,
        });

        await tx.insert(gameSessions).values({ ...insertSchedule });
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
