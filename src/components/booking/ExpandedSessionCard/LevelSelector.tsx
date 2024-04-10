/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import React from "react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useCartStore } from "@/stores/useCartStore";
import type { playLevel } from "@/types/types";
import { LevelSelectorButton } from "./LevelSelectorButton";

interface LevelSelectorProps {
  id: number;
  selectedLevel?: playLevel;
}

const PLAY_LEVELS: playLevel[] = ["beginner", "intermediate", "advanced"];

export const LevelSelector = ({ id, selectedLevel }: LevelSelectorProps) => {
  const updatePlayLevelById = useCartStore(
    (state) => state.updatePlayLevelById,
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="w-full text-tertiary-foreground rounded-b-md bg-tertiary text-sm font-semibold h-12 capitalize">
          {selectedLevel ?? "Select Play Level"}
        </button>
      </DrawerTrigger>
      <DrawerContent className="p-4 pb-10 bg-neutral">
        <span className="text-center font-medium mb-4">
          Please select a play level
        </span>
        <div className="grid grid-cols-3 gap-2 bg-white p-2 rounded-xl">
          {PLAY_LEVELS.map((playLevel) => (
            <LevelSelectorButton
              key={id}
              name={playLevel}
              selected={selectedLevel === playLevel}
              handleClick={() => updatePlayLevelById(id, playLevel)}
            />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
