"use client";

import { useEffect, useState } from "react";

import { useCartStore } from "@/stores/useCartStore";
import { GameSessionDto } from "@/types/GameSessionDto";
import { cn, getShortenedTime } from "@/lib/utils";
import { useCurrentGameSessions } from "@/hooks/query/useGameSessions";
import { Card } from "../Card";
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
          isFull: index % 3 === 0,
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
    return (
      <Card className="border  px-6 mx-4 py-4 min-h-24 grid place-items-center font-medium align-middle">
        <div className="bg-neutral rounded p-2 px-6 font-bold">Loading...</div>
      </Card>
    );
  }

  return (
    <div
      className={cn(
        "flex grow flex-col gap-3 overflow-y-auto overscroll-contain",
        className,
      )}
    >
      {sessions.map((session) => {
        const checked = cart.some((s) => s.id === session.id);
        return (
          <div
            key={session.id}
            className={
              session.isFull ? "pointer-events-none" : "cursor-pointer"
            }
            onClick={() => handleSessionClick(session.id)}
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
