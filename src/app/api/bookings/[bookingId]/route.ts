import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/session";
import { getBookingBySqid } from "@/services/booking";

export async function GET(
  _req: NextRequest,
  { params }: { params: { bookingId: string } },
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return new Response("Unauthorized request", { status: 401 });

    const userBooking = await getBookingBySqid(params.bookingId);

    if (!userBooking) return new Response("Booking not found", { status: 404 });

    if (userBooking.userId !== currentUser.id)
      return new Response("Invalid permissions", { status: 403 });

    return NextResponse.json(userBooking.bookingDetails);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(e.issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
