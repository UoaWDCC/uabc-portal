export interface GameSessionDto {
  id: number;
  weekday: number;
  startTime: string;
  endTime: string;
  location: string;
  status: "default" | "selected" | "disabled" | "unavailable";
}
