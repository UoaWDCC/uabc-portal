import { GameSession } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGameSessions = () => {
  const query = useQuery({
    queryKey: ["sessions"],
    queryFn: async (): Promise<GameSession[]> => {
      const response = await fetch(`/api/game-session/current`);

      return response.json();
    },
  });

  return query;
};
