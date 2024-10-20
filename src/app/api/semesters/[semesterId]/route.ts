import { NextResponse } from "next/server";
import { and, eq, gt, gte, lte, ne, or } from "drizzle-orm";
import { z } from "zod";

import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { bookingPeriods, semesters } from "@/lib/db/schema";
import { getZonedBookingOpenTime } from "@/lib/utils/game-sessions";
import { updateSemesterSchema } from "@/lib/validators";
import { adminRouteWrapper } from "@/lib/wrappers";

export const dynamic = "force-dynamic";

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

    const semester = await db.query.semesters.findFirst({
      where: eq(semesters.id, semesterId),
    });

    if (!semester) {
      return responses.notFound({
        resourceType: "semester",
        resourceId: semesterId,
      });
    }

    return NextResponse.json(semester, { status: 200 });
  }
);

export const DELETE = adminRouteWrapper(
  async (_req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { semesterId },
    } = routeContextSchema.parse(ctx);

    const semester = await db.query.semesters.findFirst({
      where: eq(semesters.id, semesterId),
    });

    if (!semester) {
      return responses.notFound({
        resourceType: "semester",
        resourceId: semesterId,
      });
    }

    await db.delete(semesters).where(eq(semesters.id, semesterId));

    return new Response(null, { status: 204 });
  }
);

export const PUT = adminRouteWrapper(
  async (req, ctx: z.infer<typeof routeContextSchema>) => {
    const {
      params: { semesterId },
    } = routeContextSchema.parse(ctx);

    const updatedSemester = updateSemesterSchema.parse(await req.json());

    if (
      new Date(updatedSemester.startDate) > new Date(updatedSemester.endDate)
    ) {
      return responses.badRequest({
        message: "Start date must be less than end date",
      });
    }

    if (
      new Date(updatedSemester.breakStart) > new Date(updatedSemester.breakEnd)
    ) {
      return responses.badRequest({
        message: "Break start date must be less than break end date",
      });
    }

    if (
      new Date(updatedSemester.breakStart) < new Date(updatedSemester.startDate)
    ) {
      return responses.badRequest({
        message: "Break start date must be after start date",
      });
    }

    if (
      new Date(updatedSemester.breakEnd) > new Date(updatedSemester.endDate)
    ) {
      return responses.badRequest({
        message: "Break end date must be before end date",
      });
    }

    const semester = await db.query.semesters.findFirst({
      where: eq(semesters.id, semesterId),
    });

    if (!semester) {
      return responses.notFound({
        resourceType: "semester",
        resourceId: semesterId,
      });
    }

    const existingSemester = await db.query.semesters.findFirst({
      where: and(
        ne(semesters.id, semesterId),
        or(
          eq(semesters.name, updatedSemester.name),
          and(
            lte(semesters.startDate, updatedSemester.endDate),
            gte(semesters.endDate, updatedSemester.startDate)
          )
        )
      ),
    });

    if (existingSemester) {
      if (existingSemester.name === updatedSemester.name)
        return responses.badRequest({
          message: "A semester with this name already exists.",
          code: "DUPLICATE_NAME",
        });
      return responses.badRequest({
        message: "Semester interval cannot overlap with another semester.",
        code: "OVERLAPPING_SEMESTER",
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

    return new Response(null, { status: 204 });
  }
);
