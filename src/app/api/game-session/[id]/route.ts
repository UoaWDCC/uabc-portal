import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { gameSessionValidator } from "@/lib/validators";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const session = await prisma.gameSession.findFirst({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json(session);
};

export const PATCH = async (request: NextRequest, params: { id: string }) => {
  const sessionId = parseInt(params.id);

  if (!sessionId) {
    return NextResponse.json(
      { data: {}, msg: "No id provided in the request" },
      { status: 404 },
    );
  }

  const sessionBody = (await request.json()) as Omit<
    Prisma.GameSessionGetPayload<{}>,
    "id"
  >;

  const { success } = gameSessionValidator.safeParse(sessionBody);

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

  const session = await prisma.gameSession.update({
    where: {
      id: sessionId,
    },
    data: { ...sessionBody },
  });

  return NextResponse.json({
    data: session,
    msg: "success",
  });
};
