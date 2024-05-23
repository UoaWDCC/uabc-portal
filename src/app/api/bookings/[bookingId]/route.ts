import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const routeContextSchema = z.object({
  params: z.object({
    bookingId: z.coerce.number(),
  }),
});

export async function GET(
  _req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return new Response("Unauthorized user", { status: 401 });

    const {
      params: { bookingId },
    } = routeContextSchema.parse(context);

    const userBooking = await db.query.bookings.findFirst({
      where: (bookings, { eq }) => eq(bookings.id, bookingId),
      with: {
        bookingDetails: true,
      },
    });

    if (!userBooking) return new Response("Booking not found", { status: 404 });

    if (userBooking.userId !== currentUser.id)
      return new Response("Unauthorized user", { status: 401 });

    return NextResponse.json(userBooking.bookingDetails);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(e.issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
