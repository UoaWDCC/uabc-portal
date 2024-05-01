import { NextResponse } from "next/server";
import { and, asc, eq, gt, lt, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { bookings, gameSessions, users } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";

/**
 * Gets game sessions currently available for booking
 */

interface Session {
  gamesessionId: number;
  playLevel: string;
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser === null)
      return new Response("unauthorized user", { status: 401 });

    const json = await request.json();
    const num_of_sessions = json.length;

    if (num_of_sessions === 0)
      return new Response("num_of_sessions cannot be equal to 0", {
        status: 400,
      });

    const user = await db.query.users.findFirst({
      where: eq(users.id, currentUser!.id),
    });

    if (user?.member === true) {
      if (num_of_sessions > 2) {
        return new Response("num_of_sessions cannot be greater than 2", {
          status: 400,
        });
      } else {
        for (const session of json) {
          const gameSession = await db.query.gameSessions.findFirst({
            where: eq(gameSessions.id, session.gamesessionId),
          });

          const time = new Date();
          if (time > gameSession!.endTime || time < gameSession!.startTime) {
            return new Response(null, { status: 400 });
          }
        }
        if (user.remainingSessions < num_of_sessions) {
          return new Response(null, { status: 400 });
        }

        await db.transaction(async (tx) => {
          await tx
            .update(users)
            .set({
              remainingSessions: user.remainingSessions - num_of_sessions,
            })
            .where(eq(users.id, currentUser!.id));
          await tx.insert(bookings).values({
            userId: currentUser!.id,
            gameSessionId: json[0].gamesessionId,
            createdAt: new Date(),
            difficulty: json[0].playLevel,
          });
          await tx.insert(bookings).values({
            userId: currentUser!.id,
            gameSessionId: json[1].gamesessionId,
            createdAt: new Date(),
            difficulty: json[1].playLevel,
          });
        });

        return new Response("success", { status: 204 });
      }
    } else {
      if (num_of_sessions !== 1) {
        return new Response("num_of_sessions is not equal to 1", {
          status: 400,
        });
      } else {
        const gameSession = await db.query.gameSessions.findFirst({
          where: eq(gameSessions.id, json[0].gamesessionId),
        });

        const time = new Date();
        if (time > gameSession!.endTime || time < gameSession!.startTime) {
          return new Response(null, { status: 400 });
        }
        if (user!.remainingSessions < num_of_sessions) {
          return new Response(null, { status: 400 });
        }

        await db.transaction(async (tx) => {
          await tx
            .update(users)
            .set({
              remainingSessions: user!.remainingSessions - num_of_sessions,
            })
            .where(eq(users.id, currentUser!.id));
          await tx.insert(bookings).values({
            userId: currentUser!.id,
            gameSessionId: json[0].gamesessionId,
            createdAt: new Date(),
            difficulty: json[0].playLevel,
          });
        });

        return new Response("success", { status: 204 });
      }
    }
  } catch {
    return new Response("unexpected error", { status: 500 });
  }
}
