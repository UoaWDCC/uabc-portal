import { z } from "zod";

export const emailSchema = z
  .string()
  .email()

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/\d/, { message: "Password must contain a number" })
  .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })

