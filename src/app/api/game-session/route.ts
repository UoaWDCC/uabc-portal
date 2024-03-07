import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { gameSessionValidator } from "@/lib/validators";

export const GET = async (request: NextRequest) => {
  const sessions = await prisma.gameSession.findMany();

  return NextResponse.json({ data: sessions });
};

/**
 * Creates a new game session
 */
export const POST = async (request: NextRequest) => {
  const sessionBody = (await request.json()) as Omit<
    Prisma.GameSessionGetPayload<{}>,
    "id"
  >;
  // const sessionBody = await request.json() as Prisma.GameSessionGetPayload<{}>;

  console.log(sessionBody);
  const { success } = gameSessionValidator.safeParse(sessionBody);

  console.log(success);

  if (!success) {
    return NextResponse.json(
      {
        data: {},
        msg: "failed, please include all required fields in response with the correct type",
      },
      {
        status: 404,
      },
    );
  }

  const session = await prisma.gameSession.create({
    data: { ...sessionBody },
  });

  return NextResponse.json({
    data: session,
    msg: "success",
  });
};
