import { useQuery } from "@tanstack/react-query";

type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  member: boolean;
  verified: boolean;
  remainingSessions: number;
};

const fetchUserInfo = async (id: string): Promise<UserResponse> => {
  const response = await fetch(`/api/users/${id}`, {
    cache: "no-store",
  });
  return response.json();
};

export const useUser = (id: string) => {
  const query = useQuery({
    queryKey: ["user-info"],
    queryFn: () => fetchUserInfo(id),
  });

  return query;
};
