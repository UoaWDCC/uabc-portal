/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import React from "react";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import type { playLevel } from "@/types/types";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

interface LevelSelectorProps {
  id: number;
  playLevel?: playLevel;
}

interface SelectorButtonProps extends LevelSelectorProps {
  currentPlayLevel: playLevel;
  handleClick: () => void;
}

const PLAY_LEVELS: playLevel[] = ["beginner", "intermediate", "advanced"];

const SelectorButton = ({
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

export const LevelSelector = ({ id, playLevel }: LevelSelectorProps) => {
  const updatePlayLevelById = useCartStore(
    (state) => state.updatePlayLevelById,
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="w-full text-tertiary-foreground rounded-b-md bg-tertiary text-sm font-semibold h-12 capitalize">
          {playLevel ?? "Select Play Level"}
        </button>
      </DrawerTrigger>
      <DrawerContent className="p-6 pb-10 bg-neutral">
        <span className="text-center font-medium mb-2">
          Please select a play level
        </span>
        <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-xl">
          {PLAY_LEVELS.map((level) => (
            <SelectorButton
              key={id}
              id={id}
              playLevel={playLevel}
              currentPlayLevel={level}
              handleClick={() => updatePlayLevelById(id, level)}
            />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
