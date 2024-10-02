import { useMutation } from "@tanstack/react-query";

export const useResetPasswordMutation = (resetPasswordToken: string) => {
  const mutation = useMutation({
    mutationFn: async (newPassword: string) => {
      const res = await fetch(
        `/api/auth/reset-password`,
        {
          method: "POST",
          body: JSON.stringify({
            newPassword,
            resetPasswordToken
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error(res.status.toString());
    },
  });
  return mutation;
};
