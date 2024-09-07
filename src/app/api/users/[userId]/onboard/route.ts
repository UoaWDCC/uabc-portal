import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { updateUserSchema } from "@/lib/validators";
import { userRouteWrapper } from "@/lib/wrappers";
import { userCache } from "@/services/user";

/**
 * PATCH function that updates a user's details
 */

export const PATCH = userRouteWrapper(
  async (req, { params }: { params: { userId: string } }, currentUser) => {
    const { userId } = params;
    if (currentUser.id !== userId) {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const body = await req.json();

    const { firstName, lastName, member } = updateUserSchema.parse(body);

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return new Response(`No User found for id: ${currentUser.id}`, {
        status: 404,
      });
    }

    await db
      .update(users)
      .set({ firstName, lastName, member })
      .where(eq(users.id, currentUser.id));

    userCache.revalidate(currentUser.email);

    return new Response(null, {
      status: 204,
    });
  }
);
