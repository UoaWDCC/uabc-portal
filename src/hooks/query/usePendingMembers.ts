import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

export type PendingMemberResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const fetchPendingMembers = async (): Promise<PendingMemberResponse[]> => {
  const response = await fetch(`/api/users?member=false`, {
    cache: "no-store",
  });
  return response.json();
};

export const usePendingMembers = () => {
  const query = useQuery({
    queryKey: [QUERY_KEY.PENDING_MEMBERS],
    queryFn: fetchPendingMembers,
  });

  return query;
};
