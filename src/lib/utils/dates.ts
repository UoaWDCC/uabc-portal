import type { NormalizedInterval, ParseOptions } from "date-fns";
import { format, interval, max, min, parse } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

/**
 * Clamps the given intervals to the intersection of the two.
 */
export function clampInterval(
  interval1: NormalizedInterval,
  interval2: NormalizedInterval
) {
  return interval(
    max([interval1.start, interval2.start]),
    min([interval1.end, interval2.end])
  );
}

export function nzstParse(
  dateStr: string,
  formatStr: string,
  referenceDate: string | number | Date,
  options: ParseOptions = {}
) {
  return fromZonedTime(
    parse(dateStr, formatStr, referenceDate, options),
    "Pacific/Auckland"
  );
}

/**
 * Formats date as Tuesday 9th July 2024
 */
export function formatFullDate(date: string | Date) {
  return format(new Date(date), "eeee do MMMM yyyy");
}

/**
 * Converts from military Time to 12-hour format
 */
export function convertTo12HourFormat(militaryTime: string): string {
  return format(parse(militaryTime, "HH:mm:ss", new Date()), "h:mma");
}
