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
    <Card>
      <div className="rounded-t-md bg-primary px-6 py-4 drop-shadow-lg">
        <p className="text-lg text-primary-foreground">{day}</p>
        <p className="text-primary-foreground/70">{location}</p>
      </div>
      <div className="bg-secondary px-6 py-8">
        <p className="text-tertiary">Address</p>
        <p className="text-tertiary/70">{address}</p>
        <p className="mt-2 text-tertiary">Time</p>
        <p className="uppercase text-tertiary/70">
          {startTime} - {endTime}
        </p>
      </div>
      <div className="rounded-b-md bg-tertiary py-2 text-center">
        <button className="w-full text-white" onClick={handleButtonClick}>
          {selectedPlayLevel ?? "Select Play Level"}
        </button>
      </div>

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
