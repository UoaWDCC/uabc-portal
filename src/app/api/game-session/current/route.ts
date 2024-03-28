import { NextResponse } from "next/server";
import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { and, asc, gt, lt } from "drizzle-orm";

/**
 * Gets game sessions currently available for booking
 */
export async function GET() {
  try {
    const sessions = await db
      .select({
        id: gameSessions.id,
        startTime: gameSessions.startTime,
        endTime: gameSessions.endTime,
        locationName: gameSessions.locationName,
        locationAddress: gameSessions.locationName,
      })
      .from(gameSessions)
      .where(
        and(
          gt(gameSessions.bookingClose, new Date()), // bookingClose is in the future
          lt(gameSessions.bookingOpen, new Date()), // bookingOpen is in the past
        ),
      )
      .orderBy(asc(gameSessions.startTime));

    return NextResponse.json(sessions);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
