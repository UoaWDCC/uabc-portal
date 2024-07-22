import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

export type ScheduleResponse = {
  id: number;
  semesterId: number;
  weekday: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  memberCapacity: number;
  casualCapacity: number;
};

const fetchSchedules = async (
  semesterId: number
): Promise<ScheduleResponse[]> => {
  const response = await fetch(`/api/semesters/${semesterId}/schedules`, {
    cache: "no-store",
  });
  return response.json();
};

export const useSchedules = (semesterId: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.SCHEDULES, semesterId],
    queryFn: () => fetchSchedules(semesterId),
  });

  return query;
};
