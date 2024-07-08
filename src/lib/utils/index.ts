import { clsx, type ClassValue } from "clsx";
import { format, formatDate, isValid, parse } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

import type { Weekday } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeekday(date: Date | string) {
  return new Date(date).toLocaleDateString("en-NZ", {
    weekday: "long",
    timeZone: "Pacific/Auckland",
  }) as Weekday;
}

// i want a function that receives a Date | string and returns a string in the form of e.g. 1st March 2022
export function formatFullDate(date: Date | string) {
  return format(new Date(date), "do MMMM yyyy");
}

/**
 * Converts from military Time to 12-hour format
 */
export function convertTo12HourFormat(militaryTime: string): string {
  return format(parse(militaryTime, "HH:mm:ss", new Date()), "h:mma");
}

/**
 * Parses a date string of the format "dd/MM/yyyy" into a Date object.
 */
export const parseDate = (date: string) => {
  return parse(date, "dd/MM/yyyy", new Date());
};

/**
 * Compares two dates of the formate "dd/MM/yyyy" and returns the difference in milliseconds.
 */
export const compareDate = (date1: string, date2: string) => {
  return parseDate(date1).getTime() - parseDate(date2).getTime();
};

/**
 * Formats a date string of the format "dd/MM/yyyy" into "yyyy-MM-dd"
 */
export const formatDateInISO = (date: string) => {
  return formatDate(parse(date, "dd/MM/yyyy", new Date()), "yyyy-MM-dd");
};

/**
 * Validates a date string of the format "dd/MM/yyyy"
 */
export const validateDate = (date: string) => {
  return isValid(parse(date, "dd/MM/yyyy", new Date()));
};

/**
 * Returns a string in the yyyy-MM-dd format in the Pacific/Auckland timezone
 */
export function formatInNZST(date: Date | string): string {
  return formatInTimeZone(new Date(date), "Pacific/Auckland", "yyyy-MM-dd");
}
