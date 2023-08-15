import { NextResponse } from "next/server";
import { prisma } from "@/db";

type BookingRefundRequest = {
  bookingId: string;
};

/**
 * Refund a booking
 */
export async function PATCH(request: Request) {
  const { bookingId } = (await request.json()) as BookingRefundRequest;

  console.log(bookingId);

  const refundedBooking = await prisma.booking.update({
    data: { status: "refunded" },
    where: { id: bookingId },
  });

  return NextResponse.json({ data: refundedBooking });
}
