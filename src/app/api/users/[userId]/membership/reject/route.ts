import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { sendMemberRejectionEmail } from "@/emails";
import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { adminRouteWrapper } from "@/lib/wrappers";
import { userCache } from "@/services/user";

export const PATCH = adminRouteWrapper(
  async (_req: NextRequest, { params }: { params: { userId: string } }) => {
    const { userId } = params;

    const [user] = await db
      .update(users)
      .set({ member: false })
      .where(eq(users.id, userId))
      .returning();

    if (!user) {
      return responses.notFound({
        resourceType: "user",
        resourceId: userId,
      });
    }

    userCache.revalidate(user.email);

    await sendMemberRejectionEmail(user);

    return new Response(null, { status: 204 });
  }
);
