import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

export type AttendeesListResponse = {
  firstName: string | null;
  lastName: string | null;
  email: string;
  playLevel: "beginner" | "intermediate" | "advanced";
  member: boolean;
  pro: boolean;
};

const fetchAttendees = async (
  gameSessionId: number
): Promise<AttendeesListResponse[]> => {
  const response = await fetch(
    `/api/game-sessions/${gameSessionId}/attendees`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};

export const useAttendees = (gameSessionId: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.ATTENDEES, gameSessionId],
    queryFn: () => fetchAttendees(gameSessionId),
  });

  return query;
};
