import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { sendMemberApprovalEmail } from "@/emails";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { adminRouteWrapper } from "@/lib/wrappers";
import { userCache } from "@/services/user";

const approveUserSchema = z.object({
  prepaidSessions: z.number(),
});

export const PATCH = adminRouteWrapper(
  async (req, { params }: { params: { userId: string } }) => {
    const { userId } = params;

    const body = await req.json();

    const { prepaidSessions } = approveUserSchema.parse(body);

    const [user] = await db
      .update(users)
      .set({ verified: true, prepaidSessions })
      .where(eq(users.id, userId))
      .returning();

    if (!user) {
      return new Response(`No user found with id: ${userId}`, {
        status: 404,
      });
    }

    userCache.revalidate(user.email);

    await sendMemberApprovalEmail(user, prepaidSessions);

    return new Response(null, { status: 204 });
  }
);
