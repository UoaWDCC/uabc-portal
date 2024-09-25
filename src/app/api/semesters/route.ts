import { NextResponse } from "next/server";
import { and, eq, gte, lte, or } from "drizzle-orm";

import { responses } from "@/lib/api/responses";
import { db } from "@/lib/db";
import { semesters } from "@/lib/db/schema";
import { insertSemesterSchema } from "@/lib/validators";
import { adminRouteWrapper } from "@/lib/wrappers";

export const GET = adminRouteWrapper(async () => {
  const semesters = await db.query.semesters.findMany({
    orderBy: (semesters, { asc }) => asc(semesters.createdAt),
  });
  return NextResponse.json(semesters, { status: 200 });
});

export const POST = adminRouteWrapper(async (req) => {
  const newSemester = insertSemesterSchema.parse(await req.json());

  if (new Date(newSemester.startDate) > new Date(newSemester.endDate)) {
    return responses.badRequest({
      message: "Start date must be less than end date",
    });
  }

  if (new Date(newSemester.breakStart) > new Date(newSemester.breakEnd)) {
    return responses.badRequest({
      message: "Break start date must be less than break end date",
    });
  }

  if (new Date(newSemester.breakStart) < new Date(newSemester.startDate)) {
    return responses.badRequest({
      message: "Break start date must be after start date",
    });
  }

  if (new Date(newSemester.breakEnd) > new Date(newSemester.endDate)) {
    return responses.badRequest({
      message: "Break end date must be before end date.",
    });
  }

  const existingSemester = await db.query.semesters.findFirst({
    where: or(
      eq(semesters.name, newSemester.name),
      and(
        lte(semesters.startDate, newSemester.endDate),
        gte(semesters.endDate, newSemester.startDate)
      )
    ),
  });

  if (existingSemester) {
    if (existingSemester.name === newSemester.name)
      return responses.badRequest({
        message: "A semester with this name already exists.",
        code: "DUPLICATE_NAME",
      });
    return responses.badRequest({
      message: "Semester interval cannot overlap with another semester.",
      code: "OVERLAPPING_SEMESTER",
    });
  }

  const semester = await db.insert(semesters).values(newSemester).returning();

  return NextResponse.json(semester, { status: 201 });
});
