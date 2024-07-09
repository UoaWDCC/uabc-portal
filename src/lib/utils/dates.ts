import type { NormalizedInterval } from "date-fns";
import { interval, max, min } from "date-fns";

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
