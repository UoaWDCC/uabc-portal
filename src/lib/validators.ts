import { z } from "zod";

export const paymentValidator = z.object({
  amount: z.number(),
  bookingId: z.string(),
  method: z.string(),
  time: z.string(),
  userId: z.string(),
});
