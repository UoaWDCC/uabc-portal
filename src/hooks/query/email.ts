import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

export type EmailResponse = {
  email: string;
};

const fetchEmail = async (hashedId: string): Promise<EmailResponse> => {
  const response = await fetch(
    `/api/auth/reset-password?resetPasswordToken=${hashedId}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};

export const useEmail = (hashedId: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.EMAIL, hashedId],
    queryFn: () => fetchEmail(hashedId),
  });

  return query;
};
