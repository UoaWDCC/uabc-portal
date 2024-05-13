import { NextResponse } from "next/server";
import { and, count, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { bookingDetails, bookings } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const currentUser = await getCurrentUser();

  const gameSessionId = 25;
  const userId = "";

  // all booking made within this week
  const [bookingsThisWeek] = await db
    .select({ count: count() })
    .from(bookings)
    .innerJoin(bookingDetails, eq(bookings.id, bookingDetails.bookingId))
    .where(
      and(
        eq(bookings.userId, currentUser!.id),
        sql`date_trunc('week', ${bookings.createdAt}) = date_trunc('week', CURRENT_DATE)`,
      ),
    );

  return NextResponse.json({ data: bookingsThisWeek });
}
