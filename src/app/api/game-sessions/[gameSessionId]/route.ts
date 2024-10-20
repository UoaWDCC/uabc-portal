import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { gameSessions } from "@/lib/db/schema";
import { updateGameSessionSchema } from "@/lib/validators";
import { adminRouteWrapper } from "@/lib/wrappers";

export const dynamic = "force-dynamic";

const routeContextSchema = z.object({
  params: z.object({
    gameSessionId: z.coerce.number(),
  }),
});

export const GET = adminRouteWrapper(
  async (_req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { gameSessionId },
    } = routeContextSchema.parse(ctx);

    const session = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.id, gameSessionId),
    });

    if (!session)
      return responses.notFound({
        resourceType: "gameSession",
        resourceId: gameSessionId,
      });

    return NextResponse.json(session);
  }
);

export const PUT = adminRouteWrapper(
  async (req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { gameSessionId },
    } = routeContextSchema.parse(ctx);

    const json = await req.json();

    const body = updateGameSessionSchema.parse(json);

    if (body.startTime > body.endTime) {
      return responses.badRequest({
        message: "Start time must be less than end time",
      });
    }

    const updatedSession = await db
      .update(gameSessions)
      .set(body)
      .where(eq(gameSessions.id, gameSessionId))
      .returning();

    if (!updatedSession.length) {
      return responses.notFound({
        resourceType: "gameSession",
        resourceId: gameSessionId,
      });
    }

    return new Response(null, { status: 204 });
  }
);

export const DELETE = adminRouteWrapper(
  async (_req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { gameSessionId },
    } = routeContextSchema.parse(ctx);

    const session = await db
      .delete(gameSessions)
      .where(eq(gameSessions.id, gameSessionId))
      .returning();

    if (session.length === 0) {
      return responses.notFound({
        resourceType: "gameSession",
        resourceId: gameSessionId,
      });
    }

    return new Response(null, { status: 204 });
  }
);
