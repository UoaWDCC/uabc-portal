import { NextResponse } from "next/server";
import { and, asc, eq, gt, lt, sql } from "drizzle-orm";
import { PgDialect } from "drizzle-orm/pg-core";

import { db } from "@/lib/db";
import {
  bookingDetails,
  bookingPeriods,
  bookings,
  gameSessions,
} from "@/lib/db/schema";

export const dynamic = "force-dynamic";

const pgDialect = new PgDialect();

export async function GET() {
  try {
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

    const sessions = await db
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

    return NextResponse.json(sessions);
  } catch (error) {
    return new Response(`Internal Server Error: ${error}`, { status: 500 });
  }
}
