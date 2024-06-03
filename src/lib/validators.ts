import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import {
  gameSessions,
  gameSessionSchedules,
  semesters,
  weekdayEnum,
} from "./db/schema";

export const ZWeekdayEnum = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const selectGameSessionSchema = createSelectSchema(gameSessions);

export const insertGameSessionSchema = createInsertSchema(gameSessions, {
  bookingOpen: z.coerce.date(),
  bookingClose: z.coerce.date(),
  date: z.coerce.date(),
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
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  breakStart: z.coerce.date(),
  breakEnd: z.coerce.date(),
  bookingOpenTime: z.string().time(),
});

export const updateSemesterSchema = z.object({
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  breakStart: z.coerce.date(),
  breakEnd: z.coerce.date(),
  bookingOpenDay: ZWeekdayEnum,
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
  weekday: ZWeekdayEnum,
  startTime: z.string().time(),
  endTime: z.string().time(),
  locationName: z.string(),
  locationAddress: z.string(),
  capacity: z.number(),
  casualCapacity: z.number(),
});
