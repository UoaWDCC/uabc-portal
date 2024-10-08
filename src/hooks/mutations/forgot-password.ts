import { useMutation } from "@tanstack/react-query";

export const useForgotPasswordMutation = () => {
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
      if (!res.ok) {
        const { code } = await res.json();
        throw new Error(code);
      }
    },
  });
  return mutation;
};
