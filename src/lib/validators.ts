import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import {
  gameSessionExceptions,
  gameSessions,
  gameSessionSchedules,
  semesters,
  weekdayEnum,
} from "./db/schema";

export const selectGameSessionSchema = createSelectSchema(gameSessions);

export const insertGameSessionSchema = createInsertSchema(gameSessions, {
  bookingOpen: z.coerce.date(),
  bookingClose: z.coerce.date(),
  date: z.string().date(),
  startTime: z.string().time(),
  endTime: z.string().time(),
});

export const updateGameSessionSchema = z.object({
  startTime: z.string().time(),
  endTime: z.string().time(),
  locationName: z.string(),
  locationAddress: z.string(),
  capacity: z.number(),
  casualCapacity: z.number(),
});

export const insertSemesterSchema = createInsertSchema(semesters, {
  startDate: z.string().date(),
  endDate: z.string().date(),
  breakStart: z.string().date(),
  breakEnd: z.string().date(),
  bookingOpenTime: z.string().time(),
});

export const updateSemesterSchema = z.object({
  name: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
  breakStart: z.string().date(),
  breakEnd: z.string().date(),
  bookingOpenDay: z.enum(weekdayEnum.enumValues),
  bookingOpenTime: z.string().time(),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  member: z.boolean(),
});

export const insertGameSessionScheduleSchema = createInsertSchema(
  gameSessionSchedules,
  {
    semesterId: z.coerce.number(),
    startTime: z.string().time(),
    endTime: z.string().time(),
  },
);

export const updateGameSessionScheduleSchema = z.object({
  semesterId: z.number(),
  weekday: z.enum(weekdayEnum.enumValues),
  startTime: z.string().time(),
  endTime: z.string().time(),
  locationName: z.string(),
  locationAddress: z.string(),
  capacity: z.number(),
  casualCapacity: z.number(),
});

export const insertGameSessionExceptionSchema = createInsertSchema(
  gameSessionExceptions,
  {
    exceptionId: z.coerce.number(),
    gameSessionDate: z.coerce.date(),
  },
);
