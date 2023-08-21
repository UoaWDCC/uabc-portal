import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

export const GET = async (req: NextRequest, params: { id: string }) => {
  const session = prisma.gameSession.findUnique({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(session);
};
