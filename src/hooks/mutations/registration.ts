import { useMutation } from "@tanstack/react-query";

export const useValidateEmailMutation = () => {
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/auth/register/validate-email", {
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

export const useResendCodeMutation = () => {
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch("/api/auth/register/resend-code", {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 429)
        throw new Error("Too many requests. Please try again later.");

      if (!res.ok)
        throw new Error("Something went wrong. Please try again later.");
    },
  });

  return mutation;
};

export const useRegisterMutation = () => {
  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
      token,
    }: {
      email: string;
      password: string;
      token: string;
    }) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok)
        throw new Error("Invalid code. Please double check and try again.");
    },
  });
  return mutation;
};
