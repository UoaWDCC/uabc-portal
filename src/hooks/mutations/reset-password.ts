import { useMutation } from "@tanstack/react-query";

export const useResetPasswordMutation = (resetPasswordToken: string) => {
  const mutation = useMutation({
    mutationFn: async ({
      newPassword,
      confirmPassword,
    }: {
      newPassword: string;
      confirmPassword: string;
    }) => {
      const res = await fetch(
        `/api/auth/reset-password?resetPasswordToken=${resetPasswordToken}`,
        {
          method: "POST",
          body: JSON.stringify({
            newPassword,
            confirmPassword,
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
