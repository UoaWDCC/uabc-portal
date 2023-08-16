import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Gets game sessions currently available for booking
 */
export const GET = async (req: NextRequest) => {
  const sessions = prisma.gameSession.findMany({
    where: {
      bookingClose: {
        gte: new Date()
      },
      bookingOpen: {
        lte: new Date()
      }
    }
  });

  return NextResponse.json({data: sessions})
};
