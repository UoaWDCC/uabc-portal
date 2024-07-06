"use client";

import { useEffect, useMemo } from "react";

import { useCurrentGameSessions } from "@/hooks/query/useCurrentGameSessions";
import { cn, convertTo12HourFormat, getWeekday } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { SelectableCard } from "./SelectableCard";
import SkeletonSelectSessionCard from "./SkeletonSessionCard";

interface SelectSessionListProps {
  isMember: boolean;
  onLimitReached: () => void;
  memberMaxSessions: number;
  className?: string;
}

export function SelectSessionList({
  onLimitReached,
  isMember,
  memberMaxSessions,
  className,
}: SelectSessionListProps) {
  const { data, isLoading } = useCurrentGameSessions();
  const maxSessions: number = isMember ? memberMaxSessions : 1;
  const cart = useCartStore((state) => state.cart);
  const updateCart = useCartStore((state) => state.updateCart);

  const sessions = useMemo(
    () =>
      data?.map((session) => {
        return {
          id: session.id,
          weekday: getWeekday(session.date),
          startTime: convertTo12HourFormat(session.startTime),
          endTime: convertTo12HourFormat(session.endTime),
          locationName: session.locationName,
          locationAddress: session.locationAddress,
          isFull:
            session.bookingCount >= session.capacity ||
            (!isMember && session.casualBookingCount >= session.casualCapacity),
        };
      }),
    [data, isMember]
  );

  useEffect(() => {
    if (sessions) {
      const updatedCart = cart.filter((cartSession) => {
        const session = sessions.find(
          (session) => session.id === cartSession.id
        );
        return session && !session.isFull;
      });

      if (updatedCart.length !== cart.length) {
        updateCart(updatedCart);
      }
    }
  }, [sessions]);

  function handleSessionClick(id: number) {
    const isInCart = cart.some((session) => session.id === id);

    if (!isInCart && cart.length >= maxSessions) {
      onLimitReached();
    } else if (isInCart) {
      updateCart(cart.filter((session) => session.id !== id));
    } else {
      updateCart([...cart, sessions!.find((session) => session.id === id)!]);
    }
  }

  if (isLoading || !sessions) {
    return (
      <div
        className={cn(
          "flex flex-col gap-3 overflow-y-auto overscroll-contain",
          className
        )}
      >
        {/* arbitrary number of cards */}
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
        "flex flex-col gap-3 overflow-y-auto overscroll-contain",
        className
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
