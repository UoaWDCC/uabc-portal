import type { PlayLevel } from "./types";

export interface CartGameSession {
  id: number;
  weekday: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  isFull: boolean;
  playLevel?: PlayLevel;
}
