import { NextResponse } from "next/server";

import { userRouteWrapper } from "@/lib/wrappers";
import { getBookingBySqid } from "@/services/booking";

export const GET = userRouteWrapper(
  async (_req, { params }: { params: { bookingId: string } }, currentUser) => {
    const userBooking = await getBookingBySqid(params.bookingId);

    if (!userBooking) return new Response("Booking not found", { status: 404 });

    if (userBooking.userId !== currentUser.id)
      return new Response("Invalid permissions", { status: 403 });

    return NextResponse.json(userBooking.bookingDetails);
  }
);
