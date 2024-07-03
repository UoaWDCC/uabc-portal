import { useQuery } from "@tanstack/react-query";

export type PendingMemberResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const fetchPendingMembers = async (): Promise<PendingMemberResponse[]> => {
  const response = await fetch(`/api/users?member=true&verified=false`, {
    cache: "no-store",
  });
  return response.json();
};

export const usePendingMembers = () => {
  const query = useQuery({
    queryKey: ["pending-members"],
    queryFn: fetchPendingMembers,
  });

  return query;
};
