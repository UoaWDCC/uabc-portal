import { NextResponse } from "next/server";
import { isAfter, parse } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { and, asc, eq, gt, lt, sql } from "drizzle-orm";
import { PgDialect } from "drizzle-orm/pg-core";

import { db } from "@/lib/db";
import {
  bookingDetails,
  bookingPeriods,
  bookings,
  gameSessions,
} from "@/lib/db/schema";
import { routeWrapper } from "@/lib/wrappers";

export const dynamic = "force-dynamic";

interface Session {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  memberCapacity: number;
  casualCapacity: number;
  memberBookingCount: number;
  casualBookingCount: number;
}

const pgDialect = new PgDialect();

export const GET = routeWrapper(async () => {
  const casualBookingSqlChunks = sql`(
      SELECT COUNT(*) FROM ${bookingDetails}
      INNER JOIN ${bookings} 
        ON ${bookingDetails.bookingId} = ${bookings.id}
      WHERE ${bookingDetails.gameSessionId} = ${gameSessions.id}
      AND ${bookings.isMember} = FALSE
    )`;
  const casualBookingCountQuery = sql.raw(
    pgDialect.sqlToQuery(casualBookingSqlChunks).sql
  );

  const memberBookingSqlChunks = sql`(
      SELECT COUNT(*) FROM ${bookingDetails}
      INNER JOIN ${bookings} 
        ON ${bookingDetails.bookingId} = ${bookings.id}
      WHERE ${bookingDetails.gameSessionId} = ${gameSessions.id}
      AND ${bookings.isMember} = TRUE
    )`;

  const memberBookingCountQuery = sql.raw(
    pgDialect.sqlToQuery(memberBookingSqlChunks).sql
  );

  const sessions: Session[] = await db
    .select({
      id: gameSessions.id,
      date: gameSessions.date,
      startTime: gameSessions.startTime,
      endTime: gameSessions.endTime,
      locationName: gameSessions.locationName,
      locationAddress: gameSessions.locationAddress,
      memberCapacity: gameSessions.memberCapacity,
      casualCapacity: gameSessions.casualCapacity,
      memberBookingCount: memberBookingCountQuery.mapWith(Number),
      casualBookingCount: casualBookingCountQuery.mapWith(Number),
    })
    .from(gameSessions)
    .innerJoin(
      bookingPeriods,
      eq(bookingPeriods.id, gameSessions.bookingPeriodId)
    )
    .where(
      and(
        lt(bookingPeriods.bookingOpenTime, new Date()), // booking start is in the past
        gt(bookingPeriods.bookingCloseTime, new Date()) // booking end is in the future
      )
    )
    .orderBy(asc(gameSessions.date));

  const filteredSessions = sessions.filter((s) =>
    isAfter(
      fromZonedTime(parse(s.startTime, "HH:mm:ss", s.date), "Pacific/Auckland"),
      new Date()
    )
  );

  return NextResponse.json(filteredSessions);
});
