import { eq } from "drizzle-orm";

import { sendMemberRejectionEmail } from "@/emails";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { adminRouteWrapper } from "@/lib/wrappers";
import { userCache } from "@/services/user";

export const PATCH = adminRouteWrapper(
  async (_req, { params }: { params: { userId: string } }) => {
    const { userId } = params;

    const [user] = await db
      .update(users)
      .set({ member: false })
      .where(eq(users.id, userId))
      .returning();

    if (!user) {
      return new Response(`No user found with id: ${userId}`, {
        status: 404,
      });
    }

    userCache.revalidate(user.email);

    await sendMemberRejectionEmail(user);

    return new Response(null, { status: 204 });
  }
);
