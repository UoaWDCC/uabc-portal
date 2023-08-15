import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

export async function GET(request: NextRequest) {
  // @TODO Janky solution please fix in future
  const bookingId = request.nextUrl.pathname.split("/")[3];

  const booking = await prisma.booking.findFirst({ where: { id: bookingId } });

  return NextResponse.json({ data: booking });
}
