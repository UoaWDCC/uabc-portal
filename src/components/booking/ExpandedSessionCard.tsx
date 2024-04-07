import React, { useState } from "react";

import { weekday } from "@/types/types";
import { Card } from "../Card";
import { LevelSelector } from "./LevelSelector";

interface ExpandedSessionCardProps {
  day: weekday;
  startTime: Date;
  endTime: Date;
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
  const [showModal, setShowModal] = useState(false);
  const [pendingLevel, setPendingLevel] = useState<string | undefined>(
    undefined,
  );

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPendingLevel(pendingLevel);
  };

  return (
    <Card className="relative font-normal">
      <div className="rounded-t-md bg-primary px-6 py-4 pr-10 drop-shadow-lg">
        <p className="text-xl text-white">{day}</p>
        <p className="text-primary-foreground/70">{location}</p>
      </div>
      <div className="bg-secondary px-6 py-8">
        <p className="text-tertiary">Address</p>
        <p className="text-tertiary/70">{address}</p>
        <p className="mt-2 text-tertiary">Time</p>
        <p className="uppercase text-tertiary/70">
          {startTime.toLocaleTimeString([], { timeStyle: "short" })} -{" "}
          {endTime.toLocaleTimeString([], { timeStyle: "short" })}
        </p>
      </div>
      <div className="rounded-b-md bg-tertiary py-2 text-center">
        <button className="w-full text-white" onClick={handleButtonClick}>
          {pendingLevel ?? "Select Play Level"}
        </button>
      </div>

      <LevelSelector
        isOpen={showModal}
        onClose={() => {
          handleCloseModal;
        }}
        onSelect={setPendingLevel}
      />
    </Card>
  );
};
