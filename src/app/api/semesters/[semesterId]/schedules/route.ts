import { NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { gameSessionSchedules } from "@/lib/db/schema";
import { insertGameSessionScheduleSchema } from "@/lib/validators";
import { adminRouteWrapper } from "@/lib/wrappers";

const routeContextSchema = z.object({
  params: z.object({
    semesterId: z.coerce.number(),
  }),
});

export const GET = adminRouteWrapper(
  async (_req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { semesterId },
    } = routeContextSchema.parse(ctx);
    const schedules = await db.query.gameSessionSchedules.findMany({
      where: eq(gameSessionSchedules.semesterId, semesterId),
      orderBy: asc(gameSessionSchedules.weekday),
    });

    return NextResponse.json(schedules);
  }
);

export const POST = adminRouteWrapper(
  async (req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { semesterId },
    } = routeContextSchema.parse(ctx);

    const newGameSession = insertGameSessionScheduleSchema.parse({
      ...(await req.json()),
      semesterId: semesterId,
    });

    if (newGameSession.startTime >= newGameSession.endTime) {
      return responses.badRequest({
        message: "Start time must be before end time",
      });
    }

    const session = await db
      .insert(gameSessionSchedules)
      .values(newGameSession)
      .returning();
    return NextResponse.json(session, { status: 201 });
  }
);
