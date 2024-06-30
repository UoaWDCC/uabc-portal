import { clsx, type ClassValue } from "clsx";
import { formatDate, isValid, parse } from "date-fns";
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

export const parseDateToObject = (date: string) => {
  return parse(date, "dd/MM/yyyy", new Date());
};

// compare two dates a - b,
// a > b return positive int, a < b return negative int, a = b return 0
export const compareDate = (date1: string, date2: string) => {
  return (
    parseDateToObject(date1).getTime() - parseDateToObject(date2).getTime()
  );
};

// Return the formatted date in "yyyy-MM-dd" string for zod validation
export const parseNzDateToZodDate = (date: string) => {
  return formatDate(parse(date, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");
};

// Return boolean use to validate date in "dd/MM/yyyy" format
export const validateDate = (date: string) => {
  return isValid(parse(date, "dd/MM/yyyy", new Date()));
};
