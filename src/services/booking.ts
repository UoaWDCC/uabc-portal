import { db } from "@/lib/db";
import { deobfuscateSqid } from "@/lib/sqid";

import "server-only";

export async function getBookingBySqid(bookingSqid: string) {
  try {
    const bookingId = deobfuscateSqid(bookingSqid);

    if (!bookingId) return null;

    return db.query.bookings.findFirst({
      where: (bookings, { eq }) => eq(bookings.id, bookingId),
      with: {
        bookingDetails: {
          with: {
            gameSession: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}
