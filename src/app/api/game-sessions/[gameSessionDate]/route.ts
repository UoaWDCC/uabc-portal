import { NextResponse, type NextRequest } from "next/server";
import { and, eq, gte, lte, or } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import {
  gameSessionExceptions,
  gameSessions,
  gameSessionSchedules,
  semesters,
  weekdayEnum,
} from "@/lib/db/schema";
import {
  insertGameSessionExceptionSchema,
  insertGameSessionSchema,
  updateGameSessionSchema,
} from "@/lib/validators";

const routeContextSchema = z.object({
  params: z.object({
    gameSessionDate: z.coerce.date(),
  }),
});

export async function GET(
  _req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const result = routeContextSchema.safeParse(context);
    if (!result.success)
      return new Response("Invalid date provided in the request", {
        status: 400,
      });

    const {
      params: { gameSessionDate },
    } = result.data;

    const gameSession = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.date, gameSessionDate),
    });

    if (gameSession) {
      return NextResponse.json(gameSession, { status: 200 });
    }

    const [gameSessionSchedule] = await db
      .select()
      .from(gameSessionSchedules)
      .innerJoin(
        semesters,
        or(
          and(
            gte(semesters.startDate, gameSessionDate),
            lte(semesters.breakStart, gameSessionDate),
          ),
          and(
            gte(semesters.breakEnd, gameSessionDate),
            lte(semesters.endDate, gameSessionDate),
          ),
        ),
      )
      .where(
        eq(
          gameSessionSchedules.weekday,
          weekdayEnum.enumValues[gameSessionDate.getDay()],
        ),
      );

    if (!gameSessionSchedule) {
      return new Response(null, { status: 204 });
    }

    const gameSessionException = await db.query.gameSessionExceptions.findFirst(
      {
        where: eq(gameSessionExceptions.gameSessionDate, gameSessionDate),
      },
    );

    if (gameSessionSchedule && !gameSessionException) {
      return NextResponse.json(gameSessionSchedule, { status: 200 });
    }
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const result = routeContextSchema.safeParse(context);
    if (!result.success)
      return new Response("Invalid date provided in the request", {
        status: 400,
      });

    const {
      params: { gameSessionDate },
    } = result.data;

    const gameSession = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.date, gameSessionDate),
    });

    if (gameSession?.id) {
      // Delete the gameSession and return
      await db
        .delete(gameSessions)
        .where(eq(gameSessions.id, gameSession.id))
        .returning();

      return new Response(null, { status: 204 });
    }

    const gameSessionException = insertGameSessionExceptionSchema.parse(
      await req.json(),
    );

    await db.insert(gameSessionExceptions).values(gameSessionException);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const result = routeContextSchema.safeParse(context);
    if (!result.success)
      return new Response("Invalid date provided in the request", {
        status: 400,
      });

    const {
      params: { gameSessionDate },
    } = result.data;

    const gameSession = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.date, gameSessionDate),
    });

    const gameSessionUpdate = updateGameSessionSchema.parse(await req.json());

    if (gameSession?.id) {
      // Update the gameSession and return
      const updatedGameSession = await db
        .update(gameSessions)
        .set(gameSessionUpdate)
        .where(eq(gameSessions.id, gameSession.id))
        .returning();

      return updatedGameSession;
    }

    // Create a gameSessionException record
    const gameSessionException = insertGameSessionExceptionSchema.parse(
      await req.json(),
    );
    await db.insert(gameSessionExceptions).values(gameSessionException);

    // Create a gameSession record with the updated data
    const gameSessionInsert = insertGameSessionSchema.parse(await req.json());
    await db.insert(gameSessions).values(gameSessionInsert);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
