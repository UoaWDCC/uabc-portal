import { NextResponse } from "next/server";
import { and, asc, gt, lt, sql } from "drizzle-orm";
import { PgDialect } from "drizzle-orm/pg-core";

import { db } from "@/lib/db";
import { bookingDetails, bookings, gameSessions } from "@/lib/db/schema";

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

    const sessions = await db
      .select({
        id: gameSessions.id,
        date: gameSessions.date,
        startTime: gameSessions.startTime,
        endTime: gameSessions.endTime,
        locationName: gameSessions.locationName,
        locationAddress: gameSessions.locationAddress,
        capacity: gameSessions.capacity,
        casualCapacity: gameSessions.casualCapacity,
        bookingCount: sql`(
          SELECT COUNT(*)
          FROM ${bookingDetails}
          WHERE ${bookingDetails.gameSessionId} = ${gameSessions.id}
        )`.mapWith(Number),
        casualBookingCount: casualBookingCountQuery.mapWith(Number),
      })
      .from(gameSessions)
      .where(
        and(
          gt(gameSessions.bookingClose, new Date()), // bookingClose is in the future
          lt(gameSessions.bookingOpen, new Date()) // bookingOpen is in the past
        )
      )
      .orderBy(asc(gameSessions.date));

    return NextResponse.json(sessions);
  } catch (error) {
    return new Response(`Internal Server Error: ${error}`, { status: 500 });
  }
}
