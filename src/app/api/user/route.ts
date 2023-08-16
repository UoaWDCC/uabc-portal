import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Get payment by id
 */
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { data: {}, msg: "No id provided in the request" },
      { status: 404 },
    );
  }

  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) {
    return NextResponse.json(
      { data: {}, msg: `no payment found for id: ${userId}` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: user, msg: "success" });
}
