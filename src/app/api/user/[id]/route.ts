import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";

/**
 * Get user by id
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!user) {
      return new Response(`No User found for id: ${id}`, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
