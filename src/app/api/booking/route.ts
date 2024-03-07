import { prisma } from "@/db";
import { NextResponse } from "next/server";

/**
 * Create a new booking
 */
export async function POST() {
  // @TODO auth users
  const newBooking = await prisma.booking.create({
    data: {
      userId: "abcd",
      gameSessionId: 1,
      status: "confirmed",
      paymentMethod: "card",
    },
  });

  return NextResponse.json({ data: newBooking });
}
