import { GameSession } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const fetchCurrentGameSessions = async (): Promise<GameSession[]> => {
  const response = await fetch(`/api/game-session/current`);
  return response.json();
};

export const useCurrentGameSessions = () => {
  const query = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchCurrentGameSessions,
  });

  return query;
};
