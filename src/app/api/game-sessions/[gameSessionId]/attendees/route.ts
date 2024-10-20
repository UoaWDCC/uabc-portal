import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { bookingDetails, bookings, gameSessions, users } from "@/lib/db/schema";
import { adminRouteWrapper } from "@/lib/wrappers";

export const dynamic = "force-dynamic";

const routeContextSchema = z.object({
  params: z.object({
    gameSessionId: z.coerce.number(),
  }),
});

export const GET = adminRouteWrapper(
  async (_req: NextRequest, context: z.infer<typeof routeContextSchema>) => {
    const result = routeContextSchema.safeParse(context);
    if (!result.success)
      return new Response("Invalid id provided in the request", {
        status: 400,
      });

    const {
      params: { gameSessionId },
    } = result.data;

    const session = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.id, gameSessionId),
    });

    if (!session)
      return new Response(`No Game Session found with id: ${gameSessionId}`, {
        status: 404,
      });

    const players = await db
      .select({
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        playLevel: bookingDetails.playLevel,
        member: bookings.isMember,
        isPro: users.pro,
      })
      .from(gameSessions)
      .innerJoin(
        bookingDetails,
        eq(gameSessions.id, bookingDetails.gameSessionId)
      )
      .innerJoin(bookings, eq(bookingDetails.bookingId, bookings.id))
      .innerJoin(users, eq(bookings.userId, users.id))
      .where(eq(gameSessions.id, gameSessionId));

    const playLevelOrder = {
      advanced: 1,
      intermediate: 2,
      beginner: 3,
    };

    const sortedPlayers = players.sort((a, b) => {
      if (a.isPro && !b.isPro) {
        return -1; // a is pro and comes first
      } else if (!a.isPro && b.isPro) {
        return 1; // b is pro and comes first
      } else {
        // If both are pro or both are not pro, sort by playLevelOrder
        return playLevelOrder[a.playLevel] - playLevelOrder[b.playLevel];
      }
    });

    const data = sortedPlayers.map((player) => ({
      firstName: player.firstName,
      lastName: player.lastName,
      email: player.email,
      playLevel: player.playLevel,
      member: player.member,
      pro: player.isPro,
    }));

    return NextResponse.json(data, {
      status: 200,
    });
  }
);
