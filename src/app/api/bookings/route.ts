import { count } from "console";
import { NextResponse } from "next/server";
import {
  and,
  asc,
  eq,
  gt,
  lt,
  sql,
  TransactionRollbackError,
} from "drizzle-orm";
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
    const user_object = await db.query.users.findFirst({
      where: eq(users.id, currentUser!.id),
    });
    if (!user_object) return new Response("user not found", { status: 404 });

    // check if there are too many sessions in the request
    if (numOfSessions > (user_object?.member ? 2 : 1)) {
      return new Response("num_of_sessions exceeds limit", { status: 400 });
    }

    // if the user is a member, check if they have enough remaining sessions
    if (
      user_object?.member === true &&
      user_object.remainingSessions < numOfSessions
    ) {
      return new Response("insufficient remaining sessions", { status: 400 });
    }

    // check if there are duplicate game session ids in the request
    if (numOfSessions == 2 && json[0].gameSessionId == json[1].gameSessionId) {
      return new Response("duplicate game session ids", { status: 400 });
    }

    // check if there is already a booking for the user in the game session and if the game session actually exists and if booking is open
    for (const session of json) {
      const existingBooking = await db.query.bookings.findFirst({
        where: and(
          eq(bookings.userId, currentUser!.id),
          eq(bookings.gameSessionId, session.gameSessionId),
        ),
      });
      if (existingBooking) {
        return new Response("booking already exists", { status: 400 });
      }

      const gameSession = await db.query.gameSessions.findFirst({
        where: eq(gameSessions.id, session.gameSessionId),
      });
      if (!gameSession) {
        return new Response("game session id incorrect", { status: 400 });
      }

      // check if between bookingOpen and bookingClose
      if (
        gameSession.bookingOpen > new Date() ||
        gameSession.bookingClose < new Date()
      ) {
        return new Response("booking is closed", { status: 400 });
      }
    }

    await db.transaction(async (tx) => {
      for (const session of json) {
        const gameSession = await tx.query.gameSessions.findFirst({
          where: eq(gameSessions.id, session.gameSessionId),
        });
        await tx.execute(
          sql`SELECT * FROM ${gameSessions} WHERE ${gameSessions.id} = ${session.gameSessionId} FOR UPDATE;`,
        );
        const { count } = await tx.execute(
          sql`INSERT INTO ${bookings} ("userId", "isMember", "gameSessionId", "playLevel")
              SELECT ${user_object!.id}, ${user_object!.member}, ${session.gameSessionId}, ${session.playLevel}
              WHERE 
              (CASE
                WHEN ${user_object?.member} = TRUE THEN
                  (SELECT COUNT(*) 
                    FROM ${bookings} 
                    WHERE ${bookings.gameSessionId} = ${session.gameSessionId}) < ${gameSession?.capacity}
                ELSE
                  (SELECT COUNT(*) 
                    FROM ${bookings} 
                    WHERE ${bookings.gameSessionId} = ${session.gameSessionId}) < ${gameSession?.capacity}
                  AND
                  (SELECT COUNT(*) 
                    FROM ${bookings} 
                    WHERE ${bookings.isMember} = FALSE) < ${gameSession?.casualCapacity}
              END)
              RETURNING *;
              `,
        );

        if (count === 0) {
          throw new TransactionRollbackError();
        }
      }
      //decrement remaining sessions if user is a member
      if (user_object?.member) {
        await tx
          .update(users)
          .set({
            remainingSessions: user_object.remainingSessions - numOfSessions,
          })
          .where(eq(users.id, currentUser!.id));
      }
    });
    return new Response("bookings created", { status: 201 });
  } catch (e) {
    if (e instanceof TransactionRollbackError) {
      return new Response("game session at max capacity", { status: 409 });
    } else if (e instanceof z.ZodError) {
      return NextResponse.json(e.issues, { status: 400 });
    } else {
      console.error(e);
      return new Response("unexpected error", { status: 500 });
    }
  }
}
