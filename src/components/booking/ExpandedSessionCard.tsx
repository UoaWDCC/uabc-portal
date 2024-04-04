import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

import { Card } from "../Card";
import { LevelSelector } from "./LevelSelector";

interface ExpandedSessionCardProps {
  day: weekday;
  startTime: Date;
  endTime: Date;
  location: string;
  address: string;
}
enum weekday {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
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
      <div className="rounded-t-md bg-blue-600 px-6 py-4 pr-10 drop-shadow-lg">
        <div className="absolute right-5 top-10 -translate-y-1/2">
          <IoCheckmarkCircle color="white" size={30}></IoCheckmarkCircle>
        </div>
        <p className="text-xl text-white">{day}</p>
        <p className="text-indigo-200">{location}</p>
      </div>
      <div className="bg-gray-200 px-6 py-8">
        <p className="text-gray-800">Address</p>
        <p className="text-gray-500">{address}</p>
        <p className="mt-2 text-gray-800">Time</p>
        <p className="uppercase text-gray-500">
          {startTime.toLocaleTimeString([], { timeStyle: "short" })} -{" "}
          {endTime.toLocaleTimeString([], { timeStyle: "short" })}
        </p>
      </div>
      <div className="rounded-b-md bg-gray-500 py-2 text-center">
        <button
          className="w-full capitalize text-white"
          onClick={handleButtonClick}
        >
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
