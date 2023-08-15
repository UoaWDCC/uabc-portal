import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function GET(request: Request) {
  const user = await prisma.user.findFirst();

  return NextResponse.json({ data: user });
}
