import React from "react";

import { cn } from "@/lib/utils";
import type { playLevel } from "@/types/types";

interface LevelSelectorButtonProps {
  name?: playLevel;
  selected: boolean;
  handleClick: () => void;
}

export const LevelSelectorButton = ({
  name,
  selected,
  handleClick,
}: LevelSelectorButtonProps) => (
  <button
    className={cn(
      "h-12 rounded capitalize text-sm font-medium break-words p-1",
      selected
        ? "bg-primary text-primary-foreground"
        : "bg-white text-tertiary hover:bg-tertiary/10 hover:text-tertiary",
    )}
    onClick={handleClick}
  >
    {name}
  </button>
);
