import { useMutation } from "@tanstack/react-query";

export const useCreateScheduleMutation = () => {
  const mutation = useMutation({
    mutationFn: async ({
      semesterId,
      body,
    }: {
      semesterId: number;
      body: BodyInit;
    }) => {
      const response = await fetch(`/api/semesters/${semesterId}/schedules`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error();
      }
    },
  });

  return mutation;
};

export const useDeleteScheduleMutation = () => {
  const mutation = useMutation({
    mutationFn: async ({ semesterId }: { semesterId: number }) => {
      const response = await fetch(`/api/semesters/${semesterId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        await response.text().then((text) => {
          throw new Error(text || "An error has occurred");
        });
      }
    },
  });

  return mutation;
};

export const useEditScheduleMutation = () => {
  const mutation = useMutation({
    mutationFn: async ({
      semesterId,
      body,
    }: {
      semesterId: number;
      body: BodyInit;
    }) => {
      const response = await fetch(`/api/semesters/${semesterId}/schedules`, {
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        await response.text().then((text) => {
          throw new Error(text || "An error has occurred");
        });
      }
    },
  });

  return mutation;
};
