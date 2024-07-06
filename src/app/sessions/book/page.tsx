"use client";

import { useMemo, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";

export default function BookSessionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    (session) => session.playLevel !== undefined
  );

  const handleConfirmButtonClick = async () => {
    try {
      setIsSubmitting(true);

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
        const { id } = await response.json();
        router.push(`/booking-confirmation/${id}`);
      } else if (response.status === 409) {
        redirect("/sessions");
      } else {
        throw new Error("Failed to confirm booking");
      }
    } catch (error) {
      console.error("Error while confirming booking:", error);
      router.push("/sessions");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cart.length) {
    redirect("/sessions");
  }

  return (
    <div className="mx-4 flex h-dvh flex-col gap-y-4">
      <NavigationBar title="Select your level of play" />

      {sortedSessions.map((session) => (
        <div key={session.id} className="mb-4">
          <ExpandedSessionCard gameSession={session} />
        </div>
      ))}

      <div className="mb-10 flex flex-grow">
        <Button
          className="w-full self-end"
          onClick={handleConfirmButtonClick}
          disabled={!isPlayLevelSelected || isSubmitting}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
