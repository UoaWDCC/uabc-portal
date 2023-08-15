import { NextResponse } from "next/server";
import { prisma } from "@/db";

// @TODO remove this later
import { ObjectId } from "bson";

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
