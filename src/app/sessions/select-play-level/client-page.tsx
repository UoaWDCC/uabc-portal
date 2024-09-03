"use client";

import { useMemo, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { ExpandedSessionCard } from "@/components/booking/sessions/ExpandedSessionCard";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCartStore } from "@/stores/useCartStore";

export default function ClientSelectPlayLevelPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const { toast } = useToast();

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
        router.refresh();
      } else if (response.status === 409) {
        toast({
          title: "Something went wrong.",
          description: "A session you selected has reached its max capacity. ",
          variant: "destructive",
        });
        router.push("/sessions");
      } else {
        throw new Error("Failed to confirm booking");
      }
    } catch (error) {
      console.error("Error while confirming booking:", error);
      toast({
        title: "Something went wrong.",
        description:
          "An error occurred while confirming your booking. Please try again.",
        variant: "destructive",
      });
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
      <NavigationBar title="Select your level of play" pathName="/sessions" />

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
