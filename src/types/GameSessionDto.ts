export interface GameSessionDto {
  id: number;
  weekday: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  isFull: boolean;
}
