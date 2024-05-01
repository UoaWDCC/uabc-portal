import { NextResponse } from "next/server";
import { and, asc, eq, gt, lt, sql } from "drizzle-orm";
import { number, z } from "zod";

import { db } from "@/lib/db";
import { bookings, gameSessions, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";

/**
 * Gets game sessions currently available for booking
 */

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return new Response("unauthorized user", { status: 401 });

    const bookingSchema = z.array(
      z.object({
        gameSessionId: z.number(),
        playLevel: z.union([
          z.literal("beginner"),
          z.literal("intermediate"),
          z.literal("advanced"),
        ]),
      }),
    );

    // parse the input array of objects and check if the user has enough sessions
    const json = bookingSchema.parse(await request.json());
    const numOfSessions = json.length;

    if (numOfSessions === 0)
      return new Response("num_of_sessions cannot be equal to 0", {
        status: 400,
      });

    // find user
    const user = await db.query.users.findFirst({
      where: eq(users.id, currentUser!.id),
    });

    if (numOfSessions <= (user?.member ? 2 : 1) && numOfSessions > 0) {
      // iterate through all the sessions in the request
      for (const session of json) {
        const gameSession = await db.query.gameSessions.findFirst({
          where: eq(gameSessions.id, session.gameSessionId),
        });

        // check if the booking is within the time period
        const time = new Date();
        if (time > gameSession!.endTime || time < gameSession!.startTime) {
          return new Response("booking not within the time period", {
            status: 400,
          });
        }

        // check if the session is already full
        const booking = await db.query.bookings.findMany({
          where: eq(bookings.gameSessionId, session.gameSessionId),
        });
        if (booking.length >= gameSession!.maxUsers) {
          return new Response("game session is full", { status: 400 });
        }
      }

      // if the user is a member, check if they have enough remaining sessions
      if (user?.member === true && user.remainingSessions < numOfSessions) {
        return new Response("insufficient remaining sessions", { status: 400 });
      }

      // if all checks pass, insert the bookings into the database and update the user's remaining sessions
      await db.transaction(async (tx) => {
        if (user?.member) {
          await tx
            .update(users)
            .set({
              remainingSessions: user.remainingSessions - numOfSessions,
            })
            .where(eq(users.id, currentUser!.id));
        }
        for (let i = 0; i < numOfSessions; i++) {
          await tx.insert(bookings).values({
            userId: currentUser!.id,
            gameSessionId: json[i].gameSessionId,
            difficulty: json[i].playLevel,
          });
        }
      });

      return new Response("bookings created", { status: 201 });
    } else {
      return new Response("num_of_sessions exceeds limit", { status: 400 });
    }
  } catch {
    return new Response("unexpected error", { status: 500 });
  }
}
