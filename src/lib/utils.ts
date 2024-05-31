import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import type { Weekday } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeekday(date: Date | string) {
  return new Date(date).toLocaleDateString("en-NZ", {
    weekday: "long",
  }) as Weekday;
}

export function convertTo12HourFormat(time24: string): string {
  // Split the input string into hours and minutes
  const [hoursStr, minutesStr] = time24.split(":");

  // Convert the hours and minutes to numbers
  let hours = parseInt(hoursStr);
  const minutes = parseInt(minutesStr);

  // Determine if it's AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour time to 12-hour time
  hours = hours % 12 || 12; // Convert '0' hour to '12'

  // Format the minutes to ensure two digits
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

  // Return the formatted time string
  return `${hours}:${formattedMinutes}${period}`;
}

export const validateDate = (date: string) => {
  // format DD/MM/YY
  const dateParts: string[] = date.split("/");
  //simple date validation
  if (dateParts.length != 3 || dateParts.includes("")) return false;
  if (2 < dateParts[0].length) return false; //DD
  if (2 < dateParts[1].length) return false; //MM
  if (dateParts[2].length != 4) return false; //YY

  return z.coerce
    .date()
    .safeParse(new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`))
    .success;
};
