import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role != "admin") {
      return new Response("ERROR: Unauthorized request", { status: 403 });
    }
    const newGameSession = await req.json();
    const session = await db
      .insert(gameSessionSchedules)
      .values(newGameSession)
      .returning();
    return NextResponse.json(session, { status: 201 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const gameSessions = await db.query.gameSessionSchedules.findMany();

    return NextResponse.json(gameSessions);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
