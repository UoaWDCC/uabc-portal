import { useMutation } from "@tanstack/react-query";

export const useForgotPasswordEmailMutation = () => {
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(res.status.toString());
    },
  });
  return mutation;
};
