import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Get booking by id
 */
export async function GET(request: NextRequest, { id }: { id: number }) {
  const booking = await prisma.booking.findFirst({ where: { id } });

  if (!booking) {
    return NextResponse.json(
      { data: {}, msg: `no booking found for id: ${id}` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: booking });
}
