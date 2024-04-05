"use client";

import { useMemo } from "react";

import { useCurrentGameSessions } from "@/hooks/query/useCurrentGameSessions";
import { cn, getShortenedTime, getWeekday } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { GameSessionDto } from "@/types/GameSessionDto";
import SkeletonSelectSessionCard from "../SkeletonSessionCard";
import { SelectableCard } from "./SelectableCard";
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
  const maxSessions: number = isMember ? 2 : 1;
  const cart = useCartStore((state) => state.cart);
  const updateCart = useCartStore((state) => state.updateCart);
  const sessionsSelected = cart.length;

  const sessions = useMemo(
    () =>
      data?.map((session) => {
        return {
          id: session.id,
          weekday: getWeekday(session.startTime),
          startTime: getShortenedTime(session.startTime),
          endTime: getShortenedTime(session.endTime),
          locationName: session.locationName,
          locationAddress: session.locationAddress,
          isFull: session.isFull,
        };
      }),
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
      <div className="flex grow flex-col gap-3 overflow-y-auto overscroll-contain mx-4">
        {/* arbitrary number of cards */}
        <SkeletonSelectSessionCard />
        <SkeletonSelectSessionCard />
        <SkeletonSelectSessionCard />
        <SkeletonSelectSessionCard />
        <SkeletonSelectSessionCard />
        <SkeletonSelectSessionCard />
        <SkeletonSelectSessionCard />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex grow flex-col gap-3 overflow-y-auto overscroll-contain",
        className,
      )}
    >
      {sessions.map((session) => (
        <SelectableCard
          key={session.id}
          session={session}
          checked={cart.some((s) => s.id === session.id)}
          handleSessionClick={handleSessionClick}
        />
      ))}
    </div>
  );
}
