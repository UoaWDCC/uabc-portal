import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Get payment by id
 */
export async function GET(request: NextRequest) {
  // @TODO Janky solution please fix in future
  const userId = request.nextUrl.pathname.split("/")[3];

  const user = await prisma.user.findFirst({ where: { id: userId } });

  if (!user) {
    return NextResponse.json({ data: {}, msg: "error" }, { status: 404 });
  }

  return NextResponse.json({ data: user, msg: "success" });
}
