"use client";

import { useMemo, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { BackNavigationBar } from "@/components/BackNavigationBar";
import { ExpandedSessionCard } from "@/components/booking/sessions/ExpandedSessionCard";
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
    setIsSubmitting(true);

    const payload = sortedSessions.map((session) => ({
      gameSessionId: session.id,
      playLevel: session.playLevel,
    }));

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const { id } = await res.json();
      router.push(`/booking-confirmation/${id}`);
      router.refresh();
    } else {
      const { code } = await res.json();

      if (code === "SESSION_FULL") {
        toast({
          title: "Session Full",
          description:
            "Unfortunately, one of the sessions you selected is now full. Please choose another session.",
          variant: "destructive",
        });
      } else if (code === "ALREADY_BOOKED") {
        toast({
          title: "Something went wrong.",
          description:
            "An error occurred while confirming your booking. Please try again.",
          variant: "destructive",
        });
      } else if (code === "LIMIT_REACHED") {
        toast({
          title: "Maximum booking limit reached.",
          description: `You have already reached the session booking limit for this week.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong.",
          description:
            "An error occurred while confirming your booking. Please try again.",
          variant: "destructive",
        });
      }

      router.push("/sessions");
    }
    setIsSubmitting(false);
  };

  if (!cart.length) {
    redirect("/sessions");
  }

  return (
    <div className="mx-4 flex h-dvh flex-col gap-y-4">
      <BackNavigationBar
        title="Select your level of play"
        pathName="/sessions"
      />

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
