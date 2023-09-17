import { GameSession } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGameSessions = () => {
  const query = useQuery(["sessions"], async (): Promise<GameSession[]> => {
    const response = await fetch(`/api/game-session`);

    return response.json();
  });

  return query;
};
