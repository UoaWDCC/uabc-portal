import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import z from "zod";

import { db } from "@/lib/db";
import { gameSessions } from "@/lib/db/schema";
import { insertGameSessionSchema } from "@/lib/validators";

export async function GET() {
  try {
    const sessions = await db.query.gameSessions.findMany();
    return NextResponse.json(sessions);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

/**
 * Creates a new game session
 */
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const body = insertGameSessionSchema.parse(json);

    await db.insert(gameSessions).values(body);

    return NextResponse.json(body, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(error.issues, { status: 400 });

    return new Response(null, { status: 500 });
  }
}
