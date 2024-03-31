"use client";

import { useEffect, useState } from "react";

import { useCurrentGameSessions } from "@/hooks/query/useCurrentGameSessions";
import { cn, getShortenedTime } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { GameSessionDto } from "@/types/GameSessionDto";
import { SelectSessionCard } from "./SelectSessionCard";

interface SelectSessionListProps {
  isMember: boolean;
  onLimitReached: () => void;
  className?: string;
}

export function SelectSessionList({
  onLimitReached,
  isMember,
  className,
}: SelectSessionListProps) {
  const { data, isLoading } = useCurrentGameSessions();
  const [sessions, setSessions] = useState<GameSessionDto[]>();
  const maxSessions: number = isMember ? 2 : 1;
  const cart = useCartStore((state) => state.cart);
  const updateCart = useCartStore((state) => state.updateCart);
  const sessionsSelected = cart.length;

  useEffect(
    () =>
      setSessions(
        data?.map((session, index) => ({
          id: session.id,
          weekday: new Date(session.startTime).getDay(),
          startTime: getShortenedTime(session.startTime),
          endTime: getShortenedTime(session.endTime),
          locationName: session.locationName,
          locationAddress: session.locationAddress,
          isFull: index % 4 === 3,
        })),
      ),
    [data],
  );

  function handleSessionClick(id: number) {
    const isInCart = cart.some((session) => session.id === id);

    if (!isInCart && sessionsSelected >= maxSessions) {
      onLimitReached();
    } else if (isInCart) {
      updateCart(cart.filter((session) => session.id !== id));
    } else {
      updateCart([...cart, sessions!.find((session) => session.id === id)!]);
    }
  }

  if (isLoading || !sessions) {
    return <div>Loading...</div>;
  }

  return (
    <div
      data-testid="session-list"
      className={cn(
        "flex grow flex-col gap-3 overflow-y-auto overscroll-contain",
        className,
      )}
    >
      {sessions.map((session) => {
        const checked = cart.some((s) => s.id === session.id);
        return (
          <div
            data-testid="session-card"
            key={session.id}
            className={session.isFull ? "pointer-events-none" : ""}
            onClick={() => !session.isFull && handleSessionClick(session.id)}
          >
            <SelectSessionCard
              weekday={session.weekday}
              startTime={session.startTime}
              endTime={session.endTime}
              locationName={session.locationName}
              status={
                session.isFull ? "disabled" : checked ? "selected" : "default"
              }
            />
          </div>
        );
      })}
    </div>
  );
}
