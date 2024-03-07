import { NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Refund a booking
 */
export async function PATCH(request: Request, params: { id: string }) {
  const refundedBooking = await prisma.booking.update({
    data: { status: "refunded" },
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ data: refundedBooking });
}
