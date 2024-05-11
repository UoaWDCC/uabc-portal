import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { gameSessions } from "./db/schema";

export const selectGameSessionSchema = createSelectSchema(gameSessions);

export const insertGameSessionSchema = createInsertSchema(gameSessions, {
  bookingOpen: z.coerce.date(),
  bookingClose: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});

export const updateGameSessionSchema = z.object({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  locationName: z.string(),
  locationAddress: z.string(),
  capacity: z.number(),
  casualCapacity: z.number(),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  member: z.boolean(),
});
