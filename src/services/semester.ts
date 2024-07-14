import { db } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function getSemesterFromId(semesterId: number) {
  const response = await db.query.semesters.findFirst({
    where: (semesters) => eq(semesters.id, semesterId),
  });

  return response;
}
