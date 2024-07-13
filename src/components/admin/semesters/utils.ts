import { formatDate, isValid, parse } from "date-fns";

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
 * splice HH:MM:SS into HH:MM
 */
export function spliceTime(time: string) {
  return time.split(":").slice(0, 2).join(":");
}
