import "server-only";

import { and, eq, gte, lte } from "drizzle-orm";

import { db } from "@/lib/db";
import { bookingPeriods } from "@/lib/db/schema";
import { insertBookingPeriodSchema } from "@/lib/validators";

export async function getOrCreateBookingPeriod({
  semesterId,
  bookingOpenTime,
  bookingCloseTime,
}: {
  semesterId: number;
  bookingOpenTime: Date | string;
  bookingCloseTime: Date | string;
}) {
  const bookingPeriodToInsert = insertBookingPeriodSchema.parse({
    semesterId,
    bookingOpenTime,
    bookingCloseTime,
  });

  let bookingPeriod = await db.query.bookingPeriods.findFirst({
    where: and(
      gte(
        bookingPeriods.bookingCloseTime,
        bookingPeriodToInsert.bookingOpenTime
      ),
      lte(
        bookingPeriods.bookingOpenTime,
        bookingPeriodToInsert.bookingCloseTime
      )
    ),
  });

  if (!bookingPeriod) {
    [bookingPeriod] = await db
      .insert(bookingPeriods)
      .values(bookingPeriodToInsert)
      .returning();
  }

  return bookingPeriod;
}

export async function getAttendeesFromId(gameSessionId: number) {
  const response = await db.query.bookingDetails.findFirst({
    where: (bookingDetail) => eq(bookingDetail.gameSessionId, gameSessionId),
  });

  return response;
}
