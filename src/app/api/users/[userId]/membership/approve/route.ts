import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { sendMemberApprovalEmail } from "@/emails";
import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { adminRouteWrapper } from "@/lib/wrappers";
import { userCache } from "@/services/user";

export const dynamic = "force-dynamic";

const approveUserSchema = z.object({
  prepaidSessions: z.number(),
});

export const PATCH = adminRouteWrapper(
  async (req: NextRequest, { params }: { params: { userId: string } }) => {
    const { userId } = params;

    const body = await req.json();

    const { prepaidSessions } = approveUserSchema.parse(body);

    const [user] = await db
      .update(users)
      .set({ verified: true, prepaidSessions, member: true })
      .where(eq(users.id, userId))
      .returning();

    if (!user) {
      return responses.notFound({
        resourceType: "user",
        resourceId: userId,
      });
    }

    userCache.revalidate(user.email);

    await sendMemberApprovalEmail(user, prepaidSessions);

    return new Response(null, { status: 204 });
  }
);
