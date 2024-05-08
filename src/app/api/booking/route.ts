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
    //test user which is member
    // const currentUser = {
    //   id: "f58ca474-ce97-470a-ae7d-639f86fdc96f",
    //   email: "davidyl2105@gmail.com",
    //   member: true,
    //   firstName: "David",
    //   lastName: "Zhu",
    //   role: "user",
    // };
    //test user which is not member
    // const currentUser = {
    //   id: "8dc124d0-a078-40ab-9fc9-7555a5e886c3",
    //   email: "davidyl2105@gmail.com",
    //   member: true,
    //   firstName: "David",
    //   lastName: "Zhu",
    //   role: "user",
    // };

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

    // check if there are too many sessions in the request
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

    // check if there is already a booking for the user in the game session and if the game session actually exists
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
          sql`INSERT INTO ${bookings} ("userId", "userType", "gameSessionId", "playLevel")
              SELECT ${user!.id}, ${user?.member}, ${session.gameSessionId}, ${session.playLevel}
              WHERE 
              (CASE
                WHEN ${user?.member} = TRUE THEN
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
        //decrement remaining sessions if user is a member
        if (user?.member) {
          await tx.execute(
            sql`UPDATE ${users}
            SET ${users.remainingSessions} = ${users.remainingSessions}-1
            WHERE ${users.id} = ${user!.id};`,
          );
        }
        if (count === 0) {
          throw new TransactionRollbackError();
        }
      }
    });
    return new Response("bookings created", { status: 201 });
  } catch (e) {
    if (e instanceof TransactionRollbackError) {
      return new Response("game session at max capacity", { status: 409 });
    } else if (e instanceof z.ZodError) {
      return new Response("invalid json format", { status: 400 });
    } else {
      console.error(e);
      return new Response("unexpected error", { status: 500 });
    }
  }
}
