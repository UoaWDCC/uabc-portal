import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

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
      columns: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        member: true,
        verified: true,
        remainingSessions: true,
      },
    });

    if (!user) {
      return new Response(`No User found for id: ${id}`, { status: 404 });
    }

    /*const requiredFields = [
      "id",
      "firstName",
      "lastName",
      "email",
      "member",
      "verified",
      "remainingSessions",
    ];

    const filteredUser = Object.fromEntries(
      Object.entries(user).filter(([key]) => requiredFields.includes(key)),
    );*/
    console.log(user);
    return NextResponse.json(user);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
