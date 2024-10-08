import { useMutation } from "@tanstack/react-query";

import type { PlayLevel } from "@/types/types";

type Booking = {
  gameSessionId: number;
  playLevel: PlayLevel;
};

export const useBookingMutation = () => {
  const mutation = useMutation({
    mutationFn: async (payload: Booking[]) => {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const { code } = await res.json();
        throw new Error(code);
      }

      const { id } = await res.json();

      return id;
    },
  });
  return mutation;
};
