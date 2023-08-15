import { NextResponse } from "next/server";
import { prisma } from "@/db";

type BookingCancelRequest = {
  bookingId: string;
};

/**
 * Cancel a booking
 */
export async function PATCH(request: Request) {
  const { bookingId } = (await request.json()) as BookingCancelRequest;

  console.log(bookingId);

  const refundedBooking = await prisma.booking.update({
    data: { status: "pending" },
    where: { id: bookingId },
  });

  return NextResponse.json({ data: refundedBooking });
}
