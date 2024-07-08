import type { QueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { addDays, endOfMonth, format, startOfMonth, subDays } from "date-fns";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

type ActiveDatesResponse = string[];

async function fetchActiveDates(date: Date): Promise<ActiveDatesResponse> {
  const startDate = subDays(startOfMonth(date), 7);
  const endDate = addDays(endOfMonth(date), 7);

  const response = await fetch(
    `/api/game-sessions/active-dates?start-date=${format(startDate, "yyyy-MM-dd")}&end-date=${format(endDate, "yyyy-MM-dd")}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
}

export const prefetchActiveDates = async (
  date: Date,
  queryClient: QueryClient
) => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.ACTIVE_DATES, date.getFullYear(), date.getMonth()],
    queryFn: () => fetchActiveDates(date),
    staleTime: Infinity,
  });
};

export const useActiveDates = (date: Date) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.ACTIVE_DATES, date.getFullYear(), date.getMonth()],
    queryFn: () => fetchActiveDates(date),
    staleTime: Infinity,
  });

  return query;
};
