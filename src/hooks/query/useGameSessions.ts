import { useQuery } from "@tanstack/react-query";

type GameSessionResponse = {
  id: number;
  startTime: Date;
  endTime: Date;
  locationName: string;
  locationAddress: string;
};

const fetchCurrentGameSessions = async (): Promise<GameSessionResponse[]> => {
  const response = await fetch(`/api/game-session/current`, {
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
