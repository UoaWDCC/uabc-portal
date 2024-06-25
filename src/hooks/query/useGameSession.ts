import { useQuery } from "@tanstack/react-query";

type GameSessionResponse = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  capacity: number;
  casualCapacity: number;
  attendees: number;
};

const fetchGameSessionByDate = async (
  date: string,
): Promise<GameSessionResponse | null> => {
  //   const response = await fetch(`/api/game-sessions?date=${date}`, {
  //     cache: "no-store",
  //   });
  const response = await fetch(`/api/game-sessions/567`, {
    cache: "no-store",
  });
  if (response.status === 404) return null;
  return {
    attendees: 0,
    ...(await response.json()),
  };
};

export const useGameSession = (date: string) => {
  const query = useQuery({
    queryKey: ["game-sessions"],
    queryFn: () => fetchGameSessionByDate(date),
  });

  return query;
};
