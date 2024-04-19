"use client";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";
import { useCartStore } from "@/stores/useCartStore";

export default function BookSessionPage() {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="mx-5">
      {cart.map((session) => (
        <ExpandedSessionCard key={session.id} gameSession={session} />
      ))}
    </div>
  );
}
