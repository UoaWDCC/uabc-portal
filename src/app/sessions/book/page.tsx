"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/useCartStore";

export default function BookSessionPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSessionAvailable, setIsSessionAvailable] = useState(true);

  const handleConfirmButtonClick = async () => {
    try {
      setIsSubmitting(true);

      if (!isSessionAvailable) {
        alert("One or more sessions are full. Please remove them to proceed.");
        console.error(
          "One or more sessions are full. Please remove them to proceed.",
        );
        return;
      }

      console.log(isSessionAvailable);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    const checkSessionAvailability = () => {
      const availability = cart.every((session) => session.isFull !== true);
      setIsSessionAvailable(availability);
    };

    checkSessionAvailability();
  }, [cart]);

  // //if cart is empty, redirect back to sessions page
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/sessions");
    }
  }, [cart, router]);

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
          disabled={!isPlayLevelSelected || isSubmitting} // disable button when submitting data
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
