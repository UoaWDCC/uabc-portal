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

    // check if there are too many or too little sessions in the request
    if (numOfSessions > (user?.member ? 2 : 1)) {
      return new Response("num_of_sessions exceeds limit", { status: 400 });
    }

    // if the user is a member, check if they have enough remaining sessions
    if (user?.member === true && user.remainingSessions < numOfSessions) {
      return new Response("insufficient remaining sessions", { status: 400 });
    }

    // check if there are duplicate game session ids in the request
    if (numOfSessions == 2 && json[0].gameSessionId == json[1].gameSessionId) {
      return new Response("duplicate game session ids", { status: 400 });
    }

    // iterate through all the sessions in the request
    for (const session of json) {
      const gameSession = await db.query.gameSessions.findFirst({
        where: eq(gameSessions.id, session.gameSessionId),
      });

      // check if the booking is within the time period
      const currentTime = new Date();
      if (
        currentTime > gameSession!.endTime ||
        currentTime < gameSession!.startTime
      ) {
        return new Response("booking not within the time period", {
          status: 400,
        });
      }

      // check if the session is already full
      if (gameSession!.numberOfBookings >= gameSession!.maxUsers) {
        return new Response("game session is full", { status: 400 });
      }

      // check if user has already booked the session
      const booking = await db.query.bookings.findFirst({
        where: and(
          eq(bookings.userId, currentUser!.id),
          eq(bookings.gameSessionId, session.gameSessionId),
        ),
      });
      if (booking) {
        return new Response("user has already booked this session", {
          status: 400,
        });
      }
    }

    // incrementing the numberOfBookings first, then checking if the session is full to erase race conditions
    for (const session of json) {
      await db
        .update(gameSessions)
        .set({
          numberOfBookings: sql`${gameSessions.numberOfBookings} + 1`,
        })
        .where(eq(gameSessions.id, session.gameSessionId));
    }

    // check if the session is full after incrementing the numberOfBookings
    for (const session of json) {
      const gameSession = await db.query.gameSessions.findFirst({
        where: eq(gameSessions.id, session.gameSessionId),
      });
      if (gameSession!.numberOfBookings > gameSession!.maxUsers) {
        // decrement the numberOfBookings if the session is full
        for (const filledSession of json) {
          await db
            .update(gameSessions)
            .set({
              numberOfBookings: sql`${gameSessions.numberOfBookings} - 1`,
            })
            .where(eq(gameSessions.id, filledSession.gameSessionId));
        }
        return new Response("game session is full", { status: 400 });
      }
    }

    // ALL CHECKS SHOULD BE PASSED BY THIS POINT
    await db.transaction(async (tx) => {
      if (user?.member) {
        await tx
          .update(users)
          .set({
            remainingSessions: user.remainingSessions - numOfSessions,
          })
          .where(eq(users.id, currentUser!.id));
      }
      for (const session of json) {
        await tx.insert(bookings).values({
          userId: currentUser!.id,
          gameSessionId: session.gameSessionId,
          difficulty: session.playLevel,
        });
      }
    });

    return new Response("bookings created", { status: 201 });
  } catch {
    return new Response("unexpected error", { status: 500 });
  }
}
