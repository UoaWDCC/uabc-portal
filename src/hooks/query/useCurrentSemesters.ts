import { useQuery } from "@tanstack/react-query";

type DetailCardProps = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
};

const fetchSemesters = async (): Promise<DetailCardProps[]> => {
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
