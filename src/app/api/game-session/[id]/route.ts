import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { insertGameSessionSchema } from "@/db/validators";
import { eq } from "drizzle-orm";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export async function GET(
  _req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const result = routeContextSchema.safeParse(context);

    if (!result.success)
      return new Response("Invalid id provided in the request", {
        status: 400,
      });

    const {
      params: { id },
    } = result.data;

    const session = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.id, id),
    });

    if (!session)
      return new Response(`No Game Session found with id: ${id}`, {
        status: 404,
      });

    return NextResponse.json(session);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const result = routeContextSchema.safeParse(context);

    if (!result.success)
      return new Response("Invalid id provided in the request", {
        status: 400,
      });

    const {
      params: { id },
    } = result.data;

    const json = await req.json();

    const body = insertGameSessionSchema.parse(json);

    const updatedSession = await db
      .update(gameSessions)
      .set(body)
      .where(eq(gameSessions.id, id))
      .returning();

    if (!updatedSession.length) {
      return new Response(`No Game Session found with id: ${id}`, {
        status: 404,
      });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(error.issues, { status: 400 });

    return new Response("Internal Server Error", { status: 500 });
  }
}
