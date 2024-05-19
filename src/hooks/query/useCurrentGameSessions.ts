import { useQuery } from "@tanstack/react-query";

type GameSessionResponse = {
  id: number;
  date: Date;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  isFull: boolean;
};

const fetchCurrentGameSessions = async (): Promise<GameSessionResponse[]> => {
  const response = await fetch(`/api/game-sessions/current`, {
    cache: "no-store",
  });
  return response.json();
};

export const useCurrentGameSessions = () => {
  const query = useQuery({
    queryKey: ["game-sessions"],
    queryFn: fetchCurrentGameSessions,
  });

  return query;
};
