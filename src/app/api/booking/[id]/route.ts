import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { useRouter } from "next/router";

export async function GET(request: Request) {
  const user = await prisma.user.findFirst();

  return NextResponse.json({ data: user });
}
