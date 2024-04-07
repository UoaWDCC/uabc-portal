import React, { useState } from "react";

import type { weekday } from "@/types/types";
import { Card } from "../Card";
import { LevelSelector } from "./LevelSelector";

interface ExpandedSessionCardProps {
  day: weekday;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
}

export const ExpandedSessionCard = ({
  day,
  startTime,
  endTime,
  location,
  address,
}: ExpandedSessionCardProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlayLevel, setSelectedPlayLevel] = useState<
    string | undefined
  >(undefined);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPlayLevel(selectedPlayLevel);
  };

  return (
    <Card className="text-sm">
      <div className="rounded-t-md bg-primary px-6 py-4 drop-shadow-lg">
        <p className="text-lg text-primary-foreground">{day}</p>
        <p className="text-primary-foreground/70">{location}</p>
      </div>
      <div className="bg-secondary p-6">
        <p className="text-tertiary font-semibold">Address</p>
        <p className="text-tertiary/70">{address}</p>
        <br />
        <p className="text-tertiary font-semibold">Time</p>
        <p className="uppercase text-tertiary/70">
          {startTime} - {endTime}
        </p>
      </div>
      <button
        className="w-full text-tertiary-foreground rounded-b-md bg-tertiary text-sm font-semibold h-12"
        onClick={handleButtonClick}
      >
        {selectedPlayLevel ?? "Select Play Level"}
      </button>

      <LevelSelector
        isOpen={modalOpen}
        onClose={() => {
          handleCloseModal;
        }}
        onSelect={setSelectedPlayLevel}
      />
    </Card>
  );
};
