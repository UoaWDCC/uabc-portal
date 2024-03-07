import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Get payment by id
 */
export async function GET(request: NextRequest, params: { id: string }) {
  if (!params.id) {
    return NextResponse.json(
      { data: {}, msg: "No id provided in the request" },
      { status: 404 },
    );
  }

  const user = await prisma.user.findFirst({ where: { id: params.id } });

  if (!user) {
    return NextResponse.json(
      { data: {}, msg: `No User found for id: ${params.id}` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: user, msg: "success" });
}
