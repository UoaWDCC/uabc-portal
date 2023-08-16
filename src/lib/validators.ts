import { z } from "zod";

export const paymentValidator = z.object({
  amount: z.number(),
  bookingId: z.string(),
  method: z.string(),
  time: z.string(),
  userId: z.string(),
});

export const gameSessionValidator = z.object({
  bookingClose: z.date(),
  bookingOpen: z.date(),
  dateTime: z.date(),
  location: z.string(),
  maxUsers: z.number()
})
