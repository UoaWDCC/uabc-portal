import {
  addDays,
  eachDayOfInterval,
  formatISO,
  isWithinInterval,
  subDays,
} from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  gameSessions,
  gameSessionScheduleExceptions,
  gameSessionSchedules,
  semesters,
} from "@/lib/db/schema";
import { insertGameSessionSchema } from "@/lib/validators";
import { Weekday } from "@/types/types";

async function createGameSessionsForUpcomingWeek() {
  const now = new Date();
  const oneWeekFromNow = addDays(now, 7);
  const weekdayMap: { [key: number]: Weekday } = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  // between doesnt work...??
  const activeSemester = await db.query.semesters.findFirst({
    where: and(gte(semesters.startDate, now), lte(semesters.endDate, now)),
  });

  if (!activeSemester) {
    console.log("No active semester found.");
    return;
  }

  if (
    activeSemester.breakStart &&
    activeSemester.breakEnd &&
    isWithinInterval(now, {
      start: activeSemester.breakStart,
      end: activeSemester.breakEnd,
    })
  ) {
    console.log("Currently in semester break period.");
    return;
  }

  const daysOfWeek = eachDayOfInterval({ start: now, end: oneWeekFromNow });
  await db.transaction(async (tx) => {
    for (const day of daysOfWeek) {
      const dayOfWeek = day.getDay();

      //check for gameSessionScheduleExceptions and continue if deleted, and if edited then insert that instead and continue

      const schedule = await tx.query.gameSessionSchedules.findFirst({
        where: and(
          eq(gameSessionSchedules.weekday, weekdayMap[dayOfWeek]),
          eq(gameSessionSchedules.semesterId, activeSemester.id),
        ),
      });

      if (!schedule) {
        console.log(`No schedule found for ${day}`);
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

  console.log("Game sessions for the upcoming week have been created.");
}

createGameSessionsForUpcomingWeek().catch((e) => {
  console.error(e);
});
