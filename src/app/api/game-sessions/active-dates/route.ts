import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  eachDayOfInterval,
  format,
  interval,
  isWithinInterval,
} from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import {
  gameSessionExceptions,
  gameSessions,
  semesters,
} from "@/lib/db/schema";
import { getWeekday } from "@/lib/utils";
import { clampInterval } from "@/lib/utils/dates";
import { adminRouteWrapper } from "@/lib/wrappers";

export const dynamic = "force-dynamic";

const searchParamSchema = z.object({
  "start-date": z.string().date(),
  "end-date": z.string().date(),
});

export const GET = adminRouteWrapper(async (req: NextRequest) => {
  const searchParams = searchParamSchema.parse(
    Object.fromEntries(req.nextUrl.searchParams)
  );

  const startDate = searchParams["start-date"];
  const endDate = searchParams["end-date"];

  const activeDates = new Set<string>();

  const gameSessionList = await db
    .select({
      date: gameSessions.date,
    })
    .from(gameSessions)
    .where(
      and(gte(gameSessions.date, startDate), lte(gameSessions.date, endDate))
    );

  gameSessionList.forEach(({ date }) => {
    activeDates.add(date);
  });

  const gameSessionReplaceExceptions = await db
    .select({
      date: gameSessionExceptions.date,
    })
    .from(gameSessionExceptions)
    .where(
      and(
        gte(gameSessionExceptions.date, startDate),
        lte(gameSessionExceptions.date, endDate),
        eq(gameSessionExceptions.isDeleted, false)
      )
    );

  gameSessionReplaceExceptions.forEach(({ date }) => {
    activeDates.add(date);
  });

  const semesterList = await db.query.semesters.findMany({
    where: and(
      gte(semesters.endDate, startDate),
      lte(semesters.startDate, endDate)
    ),
    with: {
      gameSessionSchedules: true,
    },
  });

  semesterList.forEach((semester) => {
    const activeInterval = clampInterval(
      interval(startDate, endDate),
      interval(semester.startDate, semester.endDate)
    );

    const breakInterval = interval(semester.breakStart, semester.breakEnd);

    const dates = eachDayOfInterval(activeInterval);

    const filteredDates = dates.filter(
      (date) => !isWithinInterval(date, breakInterval)
    );

    const weekdays = semester.gameSessionSchedules.map(
      (schedule) => schedule.weekday
    );

    filteredDates.forEach((date) => {
      if (weekdays.includes(getWeekday(date))) {
        activeDates.add(format(date, "yyyy-MM-dd"));
      }
    });
  });

  const gameSessionDeleteExceptions = await db
    .select({
      date: gameSessionExceptions.date,
    })
    .from(gameSessionExceptions)
    .where(
      and(
        gte(gameSessionExceptions.date, startDate),
        lte(gameSessionExceptions.date, endDate),
        eq(gameSessionExceptions.isDeleted, true)
      )
    );

  gameSessionDeleteExceptions.forEach(({ date }) => {
    activeDates.delete(date);
  });

  gameSessionList.forEach(({ date }) => {
    activeDates.add(date);
  });

  return NextResponse.json(Array.from(activeDates).sort());
});
