import { useQuery } from "@tanstack/react-query";

export type ScheduleResponse = {
  id: number;
  semesterId: number;
  weekday: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  capacity: number;
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

export const useCurrentSchedules = (semesterId: number) => {
  const query = useQuery({
    queryKey: ["schedules", semesterId],
    queryFn: () => fetchSchedules(semesterId),
  });

  return query;
};
