import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

// @TODO remove this later
import { ObjectId } from "bson";

/**
 * Get booking by id
 */
export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get("id");

  if (!bookingId) {
    return NextResponse.json(
      { data: {}, msg: "No id provided in the request" },
      { status: 404 },
    );
  }

  const booking = await prisma.booking.findFirst({ where: { id: bookingId } });

  if (!booking) {
    return NextResponse.json(
      { data: {}, msg: `no booking found for id: ${bookingId}` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: booking });
}

/**
 * Create a new booking
 */
export async function POST() {
  // @TODO auth users
  const newBooking = await prisma.booking.create({
    data: {
      createdAt: new Date(),
      paymentMethod: new ObjectId().toString(),
      status: "pending",
      userId: new ObjectId().toString(),
      sessionId: new ObjectId().toString(),
    },
  });

  return NextResponse.json({ data: newBooking });
}
