import { useQuery } from "@tanstack/react-query";

type GameSessionData = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  bookingClose: string;
  locationName: string;
  locationAddress: string;
  capacity: number;
  casualCapacity: number;
  attendees: number;
};

type GameSessionResponse = {
  exists: boolean;
  canCreate: boolean;
  message?: string;
} & (
  | { exists: true; data: GameSessionData }
  | { exists: false; data: { bookingOpen: string } }
);

const fetchGameSessionByDate = async (
  date: string
): Promise<GameSessionResponse> => {
  const response = await fetch(`/api/game-sessions?date=${date}`, {
    cache: "no-store",
  });

  if (!response.ok && response.status !== 404) {
    throw new Error("Failed to fetch game session");
  }

  return await response.json();
};

export const useGameSession = (date: string) => {
  const query = useQuery({
    queryKey: ["game-session", date],
    queryFn: () => fetchGameSessionByDate(date),
  });

  return query;
};
