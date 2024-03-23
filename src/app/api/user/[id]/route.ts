import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * Get user by id
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const user = await db.select().from(users).where(eq(users.id, id));

  if (user.length === 0) {
    return new Response(`No User found for id: ${id}`, { status: 404 });
  }

  return NextResponse.json(user[0]);
}
