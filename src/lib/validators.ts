import { z } from "zod";

export const paymentValidator = z.object({
  amount: z.number(),
  bookingId: z.string(),
  method: z.string(),
  time: z.string(),
  userId: z.string(),
});

export const gameSessionValidator = z.object({
  id: z.string().optional(),
  bookingClose: z.coerce.date(),
  bookingOpen: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  location: z.string(),
  maxUsers: z.number(),
});
