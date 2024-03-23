import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { gameSessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { insertGameSessionSchema } from "@/db/validators";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export async function GET(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  const result = routeContextSchema.safeParse(context);

  if (!result.success)
    return new Response("Invalid id provided in the request", {
      status: 400,
    });

  const {
    params: { id },
  } = result.data;

  const session = await db
    .select()
    .from(gameSessions)
    .where(eq(gameSessions.id, id));

  if (session.length === 0)
    return new Response(`No Game Session found with id: ${id}`, {
      status: 404,
    });

  return NextResponse.json(session[0]);
}

export async function PATCH(
  request: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  const result = routeContextSchema.safeParse(context);

  if (!result.success)
    return new Response("Invalid id provided in the request", {
      status: 400,
    });

  const {
    params: { id },
  } = result.data;

  try {
    const json = await request.json();

    const body = insertGameSessionSchema.parse(json);

    if (
      !(await db.select().from(gameSessions).where(eq(gameSessions.id, id)))
        .length
    )
      return new Response(`No Game Session found with id: ${id}`, {
        status: 404,
      });

    const session = await db
      .update(gameSessions)
      .set(body)
      .where(eq(gameSessions.id, id));

    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(error.issues, { status: 400 });

    return new Response(null, { status: 500 });
  }
}
