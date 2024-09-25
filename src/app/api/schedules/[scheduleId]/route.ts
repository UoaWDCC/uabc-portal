import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";
import { updateGameSessionScheduleSchema } from "@/lib/validators";
import { adminRouteWrapper } from "@/lib/wrappers";

const routeContextSchema = z.object({
  params: z.object({
    scheduleId: z.coerce.number(),
  }),
});

export const GET = adminRouteWrapper(
  async (_req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { scheduleId },
    } = routeContextSchema.parse(ctx);

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, scheduleId),
    });

    if (!gameSessionSchedule) {
      return responses.notFound({
        resourceType: "gameSessionSchedule",
        resourceId: scheduleId,
      });
    }

    return NextResponse.json(gameSessionSchedule);
  }
);

export const PUT = adminRouteWrapper(
  async (req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { scheduleId },
    } = routeContextSchema.parse(ctx);

    const updatedGameSession = updateGameSessionScheduleSchema.parse(
      await req.json()
    );
    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, scheduleId),
    });

    if (!gameSessionSchedule) {
      return responses.notFound({
        resourceType: "gameSessionSchedule",
        resourceId: scheduleId,
      });
    }

    if (updatedGameSession.startTime >= updatedGameSession.endTime) {
      return responses.badRequest({
        message: "Start time must be before end time",
      });
    }

    const res = await db
      .update(gameSessionSchedules)
      .set(updatedGameSession)
      .where(eq(gameSessionSchedules.id, scheduleId))
      .returning();
    return NextResponse.json(res);
  }
);

export const DELETE = adminRouteWrapper(
  async (_req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { scheduleId },
    } = routeContextSchema.parse(ctx);

    const gameSessionSchedule = await db.query.gameSessionSchedules.findFirst({
      where: eq(gameSessionSchedules.id, scheduleId),
    });

    if (!gameSessionSchedule) {
      return responses.notFound({
        resourceType: "gameSessionSchedule",
        resourceId: scheduleId,
      });
    }

    await db
      .delete(gameSessionSchedules)
      .where(eq(gameSessionSchedules.id, scheduleId));
    return new Response(null, { status: 204 });
  }
);
