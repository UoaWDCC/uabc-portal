import { GameSession } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetSessions = () => {
  const query = useQuery(["sessions"], async (): Promise<GameSession[]> => {
    const response = await fetch(`/api/session`);

    return response.json();
  });

  return query;
};
