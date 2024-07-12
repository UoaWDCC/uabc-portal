import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { and, eq, gt, gte, lte, ne, or } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { bookingPeriods, semesters } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { getZonedBookingOpenTime } from "@/lib/utils/game-sessions";
import { updateSemesterSchema } from "@/lib/validators";

export async function GET(
  _req: NextRequest,
  { params }: { params: { semesterId: number } }
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
  { params }: { params: { semesterId: number } }
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
  { params }: { params: { semesterId: number } }
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

    const existingSemester = await db.query.semesters.findFirst({
      where: and(
        ne(semesters.id, semesterId),
        or(
          eq(semesters.name, updatedSemester.name),
          and(
            gte(semesters.startDate, updatedSemester.endDate),
            lte(semesters.endDate, updatedSemester.startDate)
          )
        )
      ),
    });

    if (existingSemester) {
      if (existingSemester.name === updatedSemester.name)
        return new Response("This name already exists, please pick another", {
          status: 400,
          statusText: "nameError",
        });
      return new Response("Semesters cannot overlap", {
        status: 400,
        statusText: "nameError",
      });
    }

    await db.transaction(async (tx) => {
      await tx
        .update(semesters)
        .set(updatedSemester)
        .where(eq(semesters.id, semesterId));

      const semesterBookingPeriods = await tx
        .select()
        .from(bookingPeriods)
        .where(
          and(
            eq(bookingPeriods.semesterId, semesterId),
            gt(bookingPeriods.bookingOpenTime, new Date())
          )
        );

      semesterBookingPeriods.forEach(async (bookingPeriod) => {
        await tx
          .update(bookingPeriods)
          .set({
            bookingOpenTime: getZonedBookingOpenTime({
              bookingOpenDay: updatedSemester.bookingOpenDay,
              bookingOpenTime: updatedSemester.bookingOpenTime,
              gameSessionDate: bookingPeriod.bookingCloseTime,
            }),
          })
          .where(eq(bookingPeriods.id, bookingPeriod.id));
      });
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
