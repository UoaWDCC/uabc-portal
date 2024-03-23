import { useQuery } from "@tanstack/react-query";

type GameSessionResponse = {
  id: number;
  bookingClose: Date;
  bookingOpen: Date;
  startTime: Date;
  endTime: Date;
  locationName: string;
  locationAddress: string;
  maxUsers: number;
};

const fetchCurrentGameSessions = async (): Promise<GameSessionResponse[]> => {
  const response = await fetch(`/api/game-session/current`);
  return response.json();
};

export const useCurrentGameSessions = () => {
  const query = useQuery({
    queryKey: ["game-sessions"],
    queryFn: fetchCurrentGameSessions,
  });

  return query;
};
