import { NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Cancel a booking
 */
export async function PATCH(request: Request, params: { id: string }) {
  const refundedBooking = await prisma.booking.update({
    data: { status: "pending" },
    where: { id: params.id },
  });

  return NextResponse.json({ data: refundedBooking });
}
