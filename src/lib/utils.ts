import { clsx, type ClassValue } from "clsx";
import { format, formatDate, isValid, parse } from "date-fns";
import { twMerge } from "tailwind-merge";

import type { Weekday } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeekday(date: Date | string) {
  return new Date(date).toLocaleDateString("en-NZ", {
    weekday: "long",
  }) as Weekday;
}

/**
 * Converts from Military Time to 12-hour format
 */
export function convertTo12HourFormat(militaryTime: string): string {
  return format(parse(militaryTime, "HH:mm:ss", new Date()), "HH:mma");
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
