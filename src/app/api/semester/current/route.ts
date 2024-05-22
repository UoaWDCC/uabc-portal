import { NextResponse } from "next/server";
import { asc } from "drizzle-orm";

import { db } from "@/lib/db";
import { semesters } from "@/lib/db/schema";

/**
 * Gets game sessions currently available for booking
 */
export async function GET() {
  try {
    const sessions = await db
      .select()
      .from(semesters)
      .orderBy(asc(semesters.id));

    return NextResponse.json(sessions);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
