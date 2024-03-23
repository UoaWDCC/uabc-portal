import { ChangeEvent } from "react";
import { SelectSessionCard, SelectSessionCardProps } from "./SelectSessionCard";
import { useCartStore } from "@/store/useCartStore";
import { GameSessionDto } from "@/types/GameSessionDto";

interface SelectSessionListProps {
  sessions: Map<number, GameSessionDto>;
  onLimitReached: () => void;
}

export function SelectSessionList({
  sessions,
  onLimitReached,
}: SelectSessionListProps) {
  /**
   * Changes the status of the card on click conditionally
   * If number of cards active exceeds the allowed amount, plays error animation
   */
  const isMember = true;
  const maxSessions: number = isMember ? 2 : 1;

  const cart = useCartStore((state) => state.cart);
  const sessionsSelected = cart.length;
  const updateCart = useCartStore((state) => state.updateCart);

  function sessionClick(e: ChangeEvent<HTMLInputElement>, id: number) {
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
    <div className="scroll-fade flex w-full grow flex-col gap-3 overflow-y-auto overscroll-contain px-5 py-2">
      {Array.from(sessions.values()).map((session) => {
        return (
          <SelectSessionCard
            weekday={session.weekday}
            startTime={session.startTime}
            endTime={session.endTime}
            locationName={session.locationName}
            status={
              cart.some((s) => s.id === session.id) ? "selected" : "default"
            }
            key={session.id}
            onChange={(e) => {
              sessionClick(e, session.id);
            }}
          ></SelectSessionCard>
        );
      })}
    </div>
  );
}
