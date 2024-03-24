import { selectGameSessionSchema } from "@/db/validators";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

type GameSessionResponse = z.infer<typeof selectGameSessionSchema>;

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
