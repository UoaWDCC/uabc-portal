import { NextResponse } from "next/server";
import { and, asc, gt, lt, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { bookingDetails, gameSessions } from "@/lib/db/schema";

/**
 * Gets game sessions currently available for booking
 */
export async function GET() {
  try {
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
        casualBookingCount: sql`(
          SELECT COUNT(*)
          FROM ${bookingDetails}
          WHERE ${bookingDetails.gameSessionId} = ${gameSessions.id}
          AND ${bookingDetails.isMember} = false
        )`.mapWith(Number),
      })
      .from(gameSessions)
      .where(
        and(
          gt(gameSessions.bookingClose, new Date()), // bookingClose is in the future
          lt(gameSessions.bookingOpen, new Date()), // bookingOpen is in the past
        ),
      )
      .orderBy(asc(gameSessions.date));

    return NextResponse.json(sessions);
  } catch (error) {
    return new Response(`Internal Server Error: ${error}`, { status: 500 });
  }
}
