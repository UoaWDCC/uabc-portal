import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { insertGameSessionSchema } from "@/db/validators";
import z from "zod";

export async function GET() {
  try {
    const sessions = await db.query.gameSessions.findMany();
    return NextResponse.json(sessions);
  } catch (error) {
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
