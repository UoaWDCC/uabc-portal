export interface GameSessionDto {
  id: number;
  weekday: number;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  isFull: boolean;
}
