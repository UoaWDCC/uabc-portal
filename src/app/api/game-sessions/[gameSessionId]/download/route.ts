import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { stringify } from "csv-stringify";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { bookingDetails, bookings, gameSessions, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";

const routeContextSchema = z.object({
  params: z.object({
    gameSessionId: z.coerce.number(),
  }),
});

export async function GET(
  _req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }
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

    const columns = [
      "First Name",
      "Last Name",
      "Email",
      "Play Level",
      "Member",
      "Pro",
    ];

    const data = sortedPlayers.map((player) => ({
      "First Name": player.firstName,
      "Last Name": player.lastName,
      Email: player.email,
      "Play Level": player.playLevel,
      Member: player.member ? "Yes" : "No",
      Pro: player.isPro ? "Yes" : "No",
    }));

    const csvData = await new Promise<string>((resolve, reject) => {
      stringify(data, { header: true, columns }, (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      });
    });

    return new NextResponse(csvData, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="game-session-${gameSessionId}.csv"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
