"use client";

import { ChangeEvent } from "react";
import { SelectSessionCard } from "./SelectSessionCard";
import { useCartStore } from "@/store/useCartStore";
import { GameSessionDto } from "@/types/GameSessionDto";
import { cn } from "@/lib/utils";

interface SelectSessionListProps {
  sessions: Map<number, GameSessionDto>;
  isMember: boolean;
  onLimitReached: () => void;
  className?: string;
}

export function SelectSessionList({
  sessions,
  onLimitReached,
  isMember,
  className,
}: SelectSessionListProps) {
  /**
   * Changes the status of the card on click conditionally
   * If number of cards active exceeds the allowed amount, plays error animation
   */
  const maxSessions: number = isMember ? 2 : 1;

  const cart = useCartStore((state) => state.cart);
  const sessionsSelected = cart.length;
  const updateCart = useCartStore((state) => state.updateCart);

  function handleSessionClick(e: ChangeEvent<HTMLInputElement>, id: number) {
    const isInCart = cart.some((session) => session.id === id);

    if (e.target.checked && sessionsSelected >= maxSessions) {
      e.currentTarget.checked = false;
      onLimitReached();
    } else if (e.target.checked) {
      if (!isInCart) {
        updateCart([...cart, sessions.get(id)!]);
      } else {
        updateCart(cart.filter((session) => session.id !== id));
      }
    } else {
      if (isInCart) {
        updateCart(cart.filter((session) => session.id !== id));
      } else {
        updateCart([...cart, sessions.get(id)!]);
      }
    }
  }
  return (
    <div
      className={cn(
        "flex w-full grow flex-col gap-3 overflow-y-auto overscroll-contain",
        className,
      )}
    >
      {Array.from(sessions.values()).map((session) => {
        return (
          <SelectSessionCard
            weekday={session.weekday}
            startTime={session.startTime}
            endTime={session.endTime}
            locationName={session.locationName}
            status={
              cart.some((s) => s.id === session.id)
                ? "selected"
                : session.status
            }
            key={session.id}
            onChange={(e) => {
              handleSessionClick(e, session.id);
            }}
          ></SelectSessionCard>
        );
      })}
    </div>
  );
}
