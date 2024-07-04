import React from "react";

import { cn } from "@/lib/utils";
import type { PlayLevel } from "@/types/types";

interface LevelSelectorButtonProps {
  name?: PlayLevel;
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
      "h-12 break-words rounded p-1 text-sm font-medium capitalize",
      selected
        ? "bg-primary text-primary-foreground"
        : "bg-white text-tertiary hover:bg-tertiary/10 hover:text-tertiary"
    )}
    onClick={handleClick}
  >
    {name}
  </button>
);
