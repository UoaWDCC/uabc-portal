import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/lib/utils/queryKeys";

export type EmailResponse = {
  email: string;
};

const fetchEmail = async (obfuscatedId: string): Promise<EmailResponse> => {
  const response = await fetch(
    `/api/auth/reset-password?resetPasswordToken=${obfuscatedId}`,
    {
      cache: "no-store",
    }
  );
  return response.json();
};

export const useEmail = (obfuscatedId: string) => {
  const query = useQuery({
    queryKey: [QUERY_KEY.EMAIL, obfuscatedId],
    queryFn: () => fetchEmail(obfuscatedId),
  });

  return query;
};
