import { eq } from "drizzle-orm";

import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { updateUserSchema } from "@/lib/validators";
import { userRouteWrapper } from "@/lib/wrappers";
import { userCache } from "@/services/user";

export const dynamic = "force-dynamic";

/**
 * PATCH function that updates a user's details
 */

export const PATCH = userRouteWrapper(
  async (req, { params }: { params: { userId: string } }, currentUser) => {
    const { userId } = params;

    if (currentUser.id !== userId) {
      return responses.forbidden();
    }

    const body = await req.json();

    const { firstName, lastName } = updateUserSchema.parse(body);
    // const { firstName, lastName, member } = updateUserSchema.parse(body);

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return responses.notFound({
        resourceType: "user",
        resourceId: currentUser.id,
      });
    }

    await db
      .update(users)
      // Currently set all new joined users membership to false as will just require admins to
      // look for payment
      .set({ firstName, lastName, member: false })
      // .set({ firstName, lastName, member })
      .where(eq(users.id, currentUser.id));

    userCache.revalidate(currentUser.email);

    return new Response(null, {
      status: 204,
    });
  }
);
