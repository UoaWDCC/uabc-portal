import { useMutation } from "@tanstack/react-query";

export const useEditGameSessionMutation = () => {
  const mutation = useMutation({
    mutationFn: async ({ date, body }: { date: string; body: BodyInit }) => {
      const response = await fetch(`/api/game-sessions?date=${date}`, {
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error();
    },
  });
  return mutation;
};

export const useCreateGameSessionMutation = () => {
  const mutation = useMutation({
    mutationFn: async (body: BodyInit) => {
      const response = await fetch(`/api/game-sessions`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error();
    },
  });
  return mutation;
};

export const useDeleteGameSessionMutation = () => {
  const mutation = useMutation({
    mutationFn: async (date: string) => {
      const response = await fetch(`/api/game-sessions?date=${date}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();
    },
  });
  return mutation;
};
