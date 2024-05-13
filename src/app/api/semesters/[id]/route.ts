import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { semesters } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { updateSemesterSchema } from "@/lib/validators";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { id } = params;

    const semester = await db.query.semesters.findFirst({
      where: eq(semesters.id, id),
    });

    if (!semester) {
      return new Response(`No semester found for id: ${id}`, { status: 404 });
    }

    return NextResponse.json(semester, { status: 200 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { id } = params;

    const semester = await db.query.semesters.findFirst({
      where: eq(semesters.id, id),
    });

    if (!semester) {
      return new Response(`No semester found for id: ${id}`, {
        status: 404,
      });
    }

    await db.delete(semesters).where(eq(semesters.id, id));

    return new Response(null, { status: 204 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { id } = params;

    const updatedSemester = updateSemesterSchema.parse(await req.json());

    if (updatedSemester.startDate > updatedSemester.endDate) {
      return new Response("Start date must be less than end date", {
        status: 400,
      });
    }

    if (updatedSemester.breakStart > updatedSemester.breakEnd) {
      return new Response("Break start date must be less than break end date", {
        status: 400,
      });
    }

    if (updatedSemester.breakStart < updatedSemester.startDate) {
      return new Response("Break start date must be after start date", {
        status: 400,
      });
    }

    if (updatedSemester.breakEnd > updatedSemester.endDate) {
      return new Response("Break end date must be before end date", {
        status: 400,
      });
    }

    const semester = await db.query.semesters.findFirst({
      where: eq(semesters.id, id),
    });

    if (!semester) {
      return new Response(`No semester found for id: ${id}`, {
        status: 400,
      });
    }

    const res = await db
      .update(semesters)
      .set(updatedSemester)
      .where(eq(semesters.id, id))
      .returning();

    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return new Response("Invalid body", { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
