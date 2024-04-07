import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { weekday } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getShortenedTime(date: Date | string): string {
  return new Date(date)
    .toLocaleTimeString("en-NZ", {
      timeStyle: "short",
    })
    .replace(" ", "");
}

export function getWeekday(date: Date | string) {
  return new Date(date).toLocaleDateString("en-NZ", {
    weekday: "long",
  }) as weekday;
}
