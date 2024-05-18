"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";

export default function BookSessionPage() {
  const router = useRouter();

  const handleConfirmButtonClick = async () => {
    try {
      const payload = sortedSessions.map((session) => ({
        gameSessionId: session.id,
        playLevel: session.playLevel,
      }));

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Navigate to confirmation page on success
        router.push("/sessions/book/confirmation");
      } else {
        // Redirect back to sessions page on failure
        router.push("/sessions");
      }
    } catch (error) {
      console.error("Error while confirming booking:", error);
    }
  };

  const cart = useCartStore((state) => state.cart);

  const sortedSessions = useMemo(() => {
    return [...cart].sort((a, b) => {
      const weekdays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      return weekdays.indexOf(a.weekday) - weekdays.indexOf(b.weekday);
    });
  }, [cart]);

  const isPlayLevelSelected = cart.every(
    (session) => session.playLevel !== undefined,
  );

  return (
    <div className="flex flex-col h-dvh mx-4 gap-y-4">
      <NavigationBar subHeading="Select your level of play" />

      {sortedSessions.map((session) => (
        <div key={session.id} className="mb-4">
          <ExpandedSessionCard gameSession={session} />
        </div>
      ))}

      <div className="mb-10 flex flex-grow">
        <Button
          className="w-full self-end"
          onClick={handleConfirmButtonClick}
          disabled={!isPlayLevelSelected}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
