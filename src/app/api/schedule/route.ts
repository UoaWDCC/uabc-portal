import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";

export async function POST(req: NextRequest) {
  try {
    const newGameSession = await req.json();
    await db.insert(gameSessionSchedules).values(newGameSession);
    console.log(newGameSession);
    return NextResponse.json(newGameSession, { status: 201 });
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
