import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

const fetchResetPasswordEmail = async (hashedToken: string): Promise<boolean> => {
  const response = await fetch(
    `/api/auth/reset-password?resetPasswordToken=${hashedToken}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};

export const useResetPasswordEmail = (hashedToken: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.EMAIL, hashedToken],
    queryFn: () => fetchResetPasswordEmail(hashedToken),
  });

  return query;
};
