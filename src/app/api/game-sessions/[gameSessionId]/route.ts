import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { gameSessions } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { updateGameSessionSchema } from "@/lib/validators";

const routeContextSchema = z.object({
  params: z.object({
    gameSessionId: z.coerce.number(),
  }),
});

export async function GET(
  _req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const result = routeContextSchema.safeParse(context);
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
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const currentUser = await getCurrentUser();

    if (currentUser?.role != "admin") {
      return new Response("Access denied", { status: 403 });
    }

    const result = routeContextSchema.safeParse(context);

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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  const currentUser = await getCurrentUser();

  if (currentUser?.role != "admin") {
    return new Response("Access denied", { status: 403 });
  }

  const result = routeContextSchema.safeParse(context);

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
