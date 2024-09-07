import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { gameSessions } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { updateGameSessionSchema } from "@/lib/validators";
import { adminRouteWrapper } from "@/lib/wrappers";

const routeContextSchema = z.object({
  params: z.object({
    gameSessionId: z.coerce.number(),
  }),
});

export const GET = adminRouteWrapper(
  async (_req, ctx: z.infer<typeof routeContextSchema>) => {
    const result = routeContextSchema.safeParse(ctx);
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

    return NextResponse.json(session);
  }
);

export const PUT = adminRouteWrapper(
  async (req, ctx: z.infer<typeof routeContextSchema>) => {
    const result = routeContextSchema.safeParse(ctx);

    if (!result.success)
      return new Response("Invalid id provided in the request", {
        status: 400,
      });

    const {
      params: { gameSessionId },
    } = result.data;

    const json = await req.json();

    const body = updateGameSessionSchema.parse(json);

    if (body.startTime > body.endTime) {
      return new Response("Start time must be less than end time", {
        status: 400,
      });
    }

    const updatedSession = await db
      .update(gameSessions)
      .set(body)
      .where(eq(gameSessions.id, gameSessionId))
      .returning();

    if (!updatedSession.length) {
      return new Response(`No Game Session found with id: ${gameSessionId}`, {
        status: 404,
      });
    }

    return new Response(null, { status: 204 });
  }
);

export const DELETE = adminRouteWrapper(
  async (_req, ctx: z.infer<typeof routeContextSchema>) => {
    const result = routeContextSchema.safeParse(ctx);

    if (!result.success) {
      return new Response("Invalid id provided in the request", {
        status: 400,
      });
    }

    const {
      params: { gameSessionId },
    } = result.data;

    const session = await db
      .delete(gameSessions)
      .where(eq(gameSessions.id, gameSessionId))
      .returning();

    if (session.length === 0) {
      return new Response(
        `Game session with id ${gameSessionId} does not exist.`,
        {
          status: 404,
        }
      );
    }

    return new Response(null, { status: 204 });
  }
);
