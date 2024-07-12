import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

type GameSessionData = {
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

type GameSessionResponse = {
  exists: boolean;
  canCreate: boolean;
  message?: string;
} & (
  | { exists: true; data: GameSessionData }
  | { exists: false; data: { bookingOpen: string } }
);

type CurrentGameSessionResponse = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  capacity: number;
  casualCapacity: number;
  bookingCount: number;
  casualBookingCount: number;
};

const fetchCurrentGameSessions = async (): Promise<
  CurrentGameSessionResponse[]
> => {
  const response = await fetch(`/api/game-sessions/current`, {
    cache: "no-store",
  });
  return response.json();
};

export const useCurrentGameSessions = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.CURRENT_GAME_SESSIONS],
    queryFn: fetchCurrentGameSessions,
  });

  return query;
};

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
    queryKey: [QUERY_KEY.GAME_SESSION, date],
    queryFn: () => fetchGameSessionByDate(date),
  });

  return query;
};
