import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

export type SemesterResponse = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
  bookingOpenDay: string;
  bookingOpenTime: string;
};

const fetchSemesters = async (): Promise<SemesterResponse[]> => {
  const response = await fetch(`/api/semesters`, {
    cache: "no-store",
  });
  return response.json();
};

export const useSemesters = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.SEMESTERS],
    queryFn: fetchSemesters,
  });

  return query;
};
