import { z } from "zod";

export const gameSessionFormSchema = z
  .object({
    startTime: z.string().min(1, "Field is required"),
    endTime: z.string().min(1, "Field is required"),
    locationName: z.string().min(1, "Field is required"),
    locationAddress: z.string().min(1, "Field is required"),
    memberCapacity: z.coerce
      .number({ message: "Capacity must be a number" })
      .nonnegative("Capacity must be positive")
      .refine((value) => value !== 0, { message: "Field is required" }),
    casualCapacity: z.coerce
      .number({ message: "Capacity must be a number" })
      .nonnegative("Capacity must be positive")
      .refine((value) => value !== 0, { message: "Field is required" }),
  })
  .refine(
    (data) => {
      return !data.endTime || data.startTime < data.endTime;
    },
    { message: "Start time must be before end time", path: ["startTime"] }
  );
