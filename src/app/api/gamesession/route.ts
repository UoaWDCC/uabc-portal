import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { gameSessionValidator } from "@/lib/validators";

export const GET = async (request: NextRequest) => {
  const sessions = await prisma.session.findMany();

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
  console.log(typeof sessionBody.bookingClose);
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

export const PATCH = async (request: NextRequest) => {
  const sessionId = request.nextUrl.searchParams.get("id");

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
