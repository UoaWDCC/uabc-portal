import React from "react";

import type { GameSessionDto } from "@/types/GameSessionDto";
import { SelectSessionCard } from "./SelectSessionCard";

interface SelectableCardProps {
  session: GameSessionDto;
  checked: boolean;
  handleSessionClick: (id: number) => void;
}

export const SelectableCard = ({
  session,
  checked,
  handleSessionClick,
}: SelectableCardProps) => (
  <div
    data-testid="session-card"
    key={session.id}
    className={session.isFull ? "pointer-events-none" : "cursor-pointer"}
    onClick={() => !session.isFull && handleSessionClick(session.id)}
    role="checkbox"
    aria-checked={checked}
  >
    <SelectSessionCard
      day={session.weekday}
      startTime={session.startTime}
      endTime={session.endTime}
      location={session.locationName}
      status={session.isFull ? "disabled" : checked ? "selected" : "default"}
    />
  </div>
);
