import { Session } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetSession = (id: string) => {
  const query = useQuery(["sessions"], async (): Promise<Session> => {
    const response = await fetch(`/api/session${id}`);

    return response.json();
  });

  return query;
};
