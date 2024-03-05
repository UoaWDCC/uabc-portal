import { GameSession } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGameSession = (id: string) => {
  const query = useQuery({
    queryKey: ["sessions"],
    queryFn: async (): Promise<GameSession> => {
      const response = await fetch(`/api/game-session/${id}`);

      return response.json();
    },
  });

  return query;
};
