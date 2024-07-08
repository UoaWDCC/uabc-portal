/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import React from "react";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useCartStore } from "@/stores/useCartStore";
import type { PlayLevel } from "@/types/types";
import { LevelSelectorButton } from "./LevelSelectorButton";

interface LevelSelectorProps {
  id: number;
  selectedLevel?: PlayLevel;
}

const PLAY_LEVELS: PlayLevel[] = ["beginner", "intermediate", "advanced"];

export const LevelSelector = ({ id, selectedLevel }: LevelSelectorProps) => {
  const updatePlayLevelById = useCartStore(
    (state) => state.updatePlayLevelById
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="h-12 w-full rounded-b-md bg-tertiary text-sm font-semibold capitalize text-tertiary-foreground">
          {selectedLevel ?? "Select Play Level"}
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-neutral p-4 pb-10">
        <span className="mb-4 text-center font-medium">
          Please select a play level
        </span>
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-white p-2">
          {PLAY_LEVELS.map((playLevel, index) => (
            <LevelSelectorButton
              key={index}
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
