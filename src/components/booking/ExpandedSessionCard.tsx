"use client";
/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { Card } from "../Card";
import { IoCheckmarkCircle } from "react-icons/io5";
import { LevelSelector } from "./LevelSelector";
import { useState } from "react";
import clsx from "clsx";

interface ExpandedSessionCardProps {
  id: string;
  startTime: Date;
  endTime: Date;
  location: string;
  address: string;
  level?: string;
  defaultLevel?: string;
  setLevel: (level: string | undefined) => void;
}

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const ExpandedSessionCard = ({
  startTime,
  endTime,
  location,
  address,
  level,
  setLevel,
  defaultLevel,
}: Omit<ExpandedSessionCardProps, "id">) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingLevel, setPendingLevel] = useState<string | undefined>(level);

  const dayOfWeek = weekday[startTime.getDay()];

  return (
    <>
      <div className="flex h-[100vh] w-full p-4">
        <Card className="w-full drop-shadow-lg">
          <div className="rounded-t-md bg-blue-600 px-6 py-4 pr-10 drop-shadow-lg">
            <div className="absolute right-5 top-10 -translate-y-1/2">
              <IoCheckmarkCircle color="white" size={30}></IoCheckmarkCircle>
            </div>
            <p className="text-xl text-white">{dayOfWeek}</p>
            <p className=" text-indigo-200">{location}</p>
          </div>
          <div className="text-md bg-gray-200 px-6 py-8">
            <p className=" text-gray-800">Address</p>
            <p className=" text-gray-500">{address}</p>
            <p className=" mt-2 text-gray-800">Time</p>
            <p className=" uppercase text-gray-500">
              {startTime.toLocaleTimeString([], { timeStyle: "short" })} -{" "}
              {endTime.toLocaleTimeString([], { timeStyle: "short" })}
            </p>
          </div>
          <div className="rounded-b-md bg-gray-500 py-2 text-center">
            <button
              className="w-full capitalize text-white"
              onClick={() => setIsOpen(true)}
            >
              {level ?? "Select Play Level"}
            </button>
          </div>
        </Card>
      </div>
      <LevelSelector
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setLevel(pendingLevel);
        }}
        onSelect={setPendingLevel}
        default={defaultLevel}
      />
    </>
  );
};
