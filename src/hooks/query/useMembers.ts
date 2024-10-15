import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

export type MemberResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  prepaidSessions: number;
};

const fetchMembers = async (): Promise<MemberResponse[]> => {
  const response = await fetch(`/api/users?member=true&verified=true`, {
    cache: "no-store",
  });
  return response.json();
};

export const useMembers = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.MEMBERS],
    queryFn: fetchMembers,
  });

  return query;
};
