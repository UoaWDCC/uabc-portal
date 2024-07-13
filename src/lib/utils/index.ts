import { clsx, type ClassValue } from "clsx";
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

/**
 * capitalizes the first letter of a word
 */
export function capitalize(word: string) {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}
