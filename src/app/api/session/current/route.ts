import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

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

  return NextResponse.json(sessions)
};
