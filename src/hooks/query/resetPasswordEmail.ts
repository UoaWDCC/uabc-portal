import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

export type EmailResponse = {
  email: string;
};

const fetchResetPasswordEmail = async (hashedToken: string): Promise<EmailResponse> => {
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
