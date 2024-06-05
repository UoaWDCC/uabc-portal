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
  { params }: { params: { semesterId: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { semesterId } = params;

    const semester = await db.query.semesters.findFirst({
      where: eq(semesters.id, semesterId),
    });

    if (!semester) {
      return new Response(`No semester found for id: ${semesterId}`, {
        status: 404,
      });
    }

    return NextResponse.json(semester, { status: 200 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { semesterId: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { semesterId } = params;

    const semester = await db.query.semesters.findFirst({
      where: eq(semesters.id, semesterId),
    });

    if (!semester) {
      return new Response(`No semester found for id: ${semesterId}`, {
        status: 404,
      });
    }

    await db.delete(semesters).where(eq(semesters.id, semesterId));

    return new Response(null, { status: 204 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { semesterId: number } },
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const { semesterId } = params;

    const updatedSemester = updateSemesterSchema.parse(await req.json());

    if (
      new Date(updatedSemester.startDate) > new Date(updatedSemester.endDate)
    ) {
      return new Response("Start date must be less than end date", {
        status: 400,
      });
    }

    if (
      new Date(updatedSemester.breakStart) > new Date(updatedSemester.breakEnd)
    ) {
      return new Response("Break start date must be less than break end date", {
        status: 400,
      });
    }

    if (
      new Date(updatedSemester.breakStart) < new Date(updatedSemester.startDate)
    ) {
      return new Response("Break start date must be after start date", {
        status: 400,
      });
    }

    if (
      new Date(updatedSemester.breakEnd) > new Date(updatedSemester.endDate)
    ) {
      return new Response("Break end date must be before end date", {
        status: 400,
      });
    }

    const semester = await db.query.semesters.findFirst({
      where: eq(semesters.id, semesterId),
    });

    if (!semester) {
      return new Response(`No semester found for id: ${semesterId}`, {
        status: 400,
      });
    }

    const res = await db
      .update(semesters)
      .set(updatedSemester)
      .where(eq(semesters.id, semesterId))
      .returning();

    return NextResponse.json(res, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(err.issues, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
