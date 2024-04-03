import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { gameSessions } from "./schema";

export const selectGameSessionSchema = createSelectSchema(gameSessions);

export const insertGameSessionSchema = createInsertSchema(gameSessions, {
  bookingOpen: z.coerce.date(),
  bookingClose: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
});
