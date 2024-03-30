import { NextResponse } from "next/server";
import { and, asc, gt, lt } from "drizzle-orm";

import { db } from "@/lib/db";
import { gameSessions } from "@/lib/db/schema";

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
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
