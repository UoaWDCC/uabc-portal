import { z } from "zod";

export const paymentValidator = z.object({
  amount: z.number(),
  bookingId: z.string(),
  method: z.string(),
  time: z.string(),
  userId: z.string(),
});

export const gameSessionValidator = z.object({
  bookingClose: z.string(),
  bookingOpen: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string(),
  maxUsers: z.number(),
});
