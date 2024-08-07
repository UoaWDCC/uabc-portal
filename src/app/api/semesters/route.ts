import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { and, eq, gte, lte, or } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { semesters } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/session";
import { insertSemesterSchema } from "@/lib/validators";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const semesters = await db.query.semesters.findMany({
      orderBy: (semesters, { asc }) => asc(semesters.createdAt),
    });
    return NextResponse.json(semesters, { status: 200 });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new Response("ERROR: Unauthorized request", { status: 401 });
    }
    if (user.role != "admin") {
      return new Response("ERROR: No valid permissions", { status: 403 });
    }

    const newSemester = insertSemesterSchema.parse(await req.json());

    if (new Date(newSemester.startDate) > new Date(newSemester.endDate)) {
      return new Response("Start date must be less than end date", {
        status: 400,
      });
    }

    if (new Date(newSemester.breakStart) > new Date(newSemester.breakEnd)) {
      return new Response("Break start date must be less than break end date", {
        status: 400,
      });
    }

    if (new Date(newSemester.breakStart) < new Date(newSemester.startDate)) {
      return new Response("Break start date must be after start date", {
        status: 400,
      });
    }

    if (new Date(newSemester.breakEnd) > new Date(newSemester.endDate)) {
      return new Response("Break end date must be before end date", {
        status: 400,
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
        return new Response("This name already exists, please pick another", {
          status: 400,
          statusText: "nameError",
        });
      return new Response("Semesters cannot overlap", {
        status: 400,
        statusText: "nameError",
      });
    }

    const semester = await db.insert(semesters).values(newSemester).returning();

    return NextResponse.json(semester, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
