import { useQuery } from "@tanstack/react-query";

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

export const useCurrentSemesters = () => {
  const query = useQuery({
    queryKey: ["semesters"],
    queryFn: fetchSemesters,
  });

  return query;
};
