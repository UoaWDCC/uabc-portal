import { addDays, eachDayOfInterval, isWithinInterval } from "date-fns";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import {
  gameSessions,
  gameSessionScheduleExceptions,
  gameSessionSchedules,
  semesters,
} from "@/lib/db/schema";

async function createGameSessionsForUpcomingWeek() {
  const now = new Date();
  const oneWeekFromNow = addDays(now, 7);

  // between doesnt work...??
  const activeSemester = await db.query.semesters.findFirst({
    where: isWithinInterval(now, {
      start: semesters.startDate,
      end: semesters.endDate,
    }),
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
          eq(gameSessionSchedules.weekday, dayOfWeek),
          eq(gameSessionSchedules.semesterId, activeSemester.id),
        ),
      });

      if (!schedule) {
        console.log(`No schedule found for ${day}`);
        continue;
      }

      await tx.insert(gameSessions).values({
        bookingOpen: day, //change later placeholder
        bookingClose: day, //same as above
        gameSessionScheduleId: schedule.id,
        date: day,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        locationName: schedule.locationName,
        locationAddress: schedule.locationAddress,
        capacity: schedule.capacity,
        casualCapacity: schedule.casualCapacity,
      });
    }
  });

  console.log("Game sessions for the upcoming week have been created.");
}

createGameSessionsForUpcomingWeek().catch((e) => {
  console.error(e);
});
