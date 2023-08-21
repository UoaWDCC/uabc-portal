import { z } from "zod";

export const paymentValidator = z.object({
  amount: z.number(),
  bookingId: z.string(),
  method: z.string(),
  time: z.string(),
  userId: z.string(),
});

export const gameSessionValidator = z.object({
  id: z.string(),
  bookingClose: z.date(),
  bookingOpen: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  location: z.string(),
  maxUsers: z.number(),
});
