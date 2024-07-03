import { NextResponse } from "next/server";
import { and, count, eq, sql, TransactionRollbackError } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { bookingDetails, bookings, gameSessions, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { obfuscateId } from "@/lib/sqid";

/**
 * Creates a booking for the current user
 */

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

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return new Response("Unauthorized request", { status: 401 });

    // parse the input array of objects and check if the user has enough sessions
    const json = bookingSchema.parse(await request.json());
    const numOfSessions = json.length;

    if (numOfSessions === 0)
      return new Response("Must book at least one session", {
        status: 400,
      });

    // find user
    const user = await db.query.users.findFirst({
      where: eq(users.id, currentUser!.id),
    });
    if (!user) return new Response("User not found", { status: 404 });

    const allowedBookingCount = user?.member ? 2 : 1;

    const [bookingsThisWeek] = await db
      .select({ count: count() })
      .from(bookings)
      .innerJoin(bookingDetails, eq(bookings.id, bookingDetails.bookingId))
      .where(
        and(
          eq(bookings.userId, currentUser!.id),
          sql`date_trunc('week', ${bookings.createdAt}) = date_trunc('week', CURRENT_DATE)`,
        ),
      );

    // if user has already booked the maximum allowed sessions for this week
    if (bookingsThisWeek.count + numOfSessions > allowedBookingCount) {
      return new Response("Maximum booking limit exceed", { status: 400 });
    }

    // if the user is a member, check if they have enough remaining sessions
    if (user?.member === true && user.remainingSessions < numOfSessions) {
      return new Response("Insufficient remaining prepaid sessions", {
        status: 400,
      });
    }

    // check if there are duplicate game session ids in the request
    if (numOfSessions == 2 && json[0].gameSessionId == json[1].gameSessionId) {
      return new Response("Duplicate game session ids", { status: 400 });
    }

    for (const session of json) {
      // check if there is already a booking for the user in the game session
      const [existingBooking] = await db
        .select()
        .from(bookings)
        .innerJoin(bookingDetails, eq(bookings.id, bookingDetails.bookingId))
        .where(
          and(
            eq(bookings.userId, user.id),
            eq(bookingDetails.gameSessionId, session.gameSessionId),
          ),
        );
      if (existingBooking) {
        return new Response("Booking already exists", { status: 400 });
      }

      // check if gameSession exists
      const gameSession = await db.query.gameSessions.findFirst({
        where: eq(gameSessions.id, session.gameSessionId),
      });
      if (!gameSession) {
        return new Response("Game session does not exist", { status: 400 });
      }

      // check if gameSesson is available for booking
      if (
        gameSession.bookingOpen > new Date() ||
        gameSession.bookingClose < new Date()
      ) {
        return new Response(
          "Game session is not currently available for booking",
          {
            status: 400,
          },
        );
      }
    }

    const bookingId = await db.transaction(async (tx) => {
      const [{ bookingId }] = await tx
        .insert(bookings)
        .values({
          userId: currentUser!.id,
        })
        .returning({ bookingId: bookings.id });

      for (const session of json) {
        const gameSession = await tx.query.gameSessions.findFirst({
          where: eq(gameSessions.id, session.gameSessionId),
        });
        await tx.execute(
          sql`SELECT * FROM ${gameSessions} WHERE ${gameSessions.id} = ${session.gameSessionId} FOR UPDATE;`,
        );

        const { count } = await tx.execute(
          sql`INSERT INTO ${bookingDetails} ("bookingId", "gameSessionId", "playLevel", "isMember")
              SELECT ${bookingId}, ${session.gameSessionId}, ${session.playLevel}, ${user!.member}
              WHERE 
              (CASE
                WHEN ${user!.member} = TRUE THEN
                  (SELECT COUNT(*) 
                    FROM ${bookingDetails} 
                    WHERE ${bookingDetails.gameSessionId} = ${session.gameSessionId}) < ${gameSession?.capacity}
                ELSE
                  (SELECT COUNT(*) 
                    FROM ${bookingDetails} 
                    WHERE ${bookingDetails.gameSessionId} = ${session.gameSessionId}) < ${gameSession?.capacity}
                  AND
                  (SELECT COUNT(*) 
                    FROM ${bookingDetails} 
                    WHERE ${bookingDetails.isMember} = FALSE) < ${gameSession?.casualCapacity}
              END)
              RETURNING *;
              `,
        );

        if (count === 0) {
          throw new TransactionRollbackError();
        }
      }

      //decrement remaining sessions if user is a member
      if (user?.member) {
        await tx
          .update(users)
          .set({
            remainingSessions: user.remainingSessions - numOfSessions,
          })
          .where(eq(users.id, currentUser!.id));
      }

      return bookingId;
    });

    return NextResponse.json({ id: obfuscateId(bookingId) }, { status: 201 });
  } catch (error) {
    if (error instanceof TransactionRollbackError) {
      return new Response("Game session at max capacity", { status: 409 });
    } else if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    } else {
      console.error(error);
      return new Response("Internal server error", { status: 500 });
    }
  }
}
