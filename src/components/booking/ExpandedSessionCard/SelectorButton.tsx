import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { playLevel } from "@/types/types";

interface SelectorButtonProps {
  playLevel?: playLevel;
  currentPlayLevel: playLevel;
  handleClick: () => void;
}

export const SelectorButton = ({
  playLevel,
  currentPlayLevel,
  handleClick,
}: SelectorButtonProps) => (
  <Button
    className={cn(
      "h-12 rounded capitalize",
      playLevel === currentPlayLevel
        ? "bg-primary text-primary-foreground"
        : "bg-white text-tertiary hover:bg-tertiary/10 hover:text-tertiary",
    )}
    onClick={handleClick}
  >
    {currentPlayLevel}
  </Button>
);
