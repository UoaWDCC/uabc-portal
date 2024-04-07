/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

import { Card } from "../Card";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { LevelSelector } from "./LevelSelector";

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

  function onClick(level: string) {
    setLevel(level);
  }

  return (
    <Card className="relative font-normal">
      <div className="rounded-t-md bg-blue-600 px-6 py-4 pr-10 drop-shadow-lg">
        <div className="absolute right-5 top-10 -translate-y-1/2">
          <IoCheckmarkCircle color="white" size={30}></IoCheckmarkCircle>
        </div>
        <p className="text-xl text-white">{dayOfWeek}</p>
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
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full capitalize text-white bg-gray hover: bg-gray-500">
              {level ?? "Select a Play Level"}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerDescription>
                  Please select a play level
                </DrawerDescription>
              </DrawerHeader>
              <Button onClick={() => onClick("Beginner")}>Beginner</Button>
              <Button onClick={() => onClick("Intermediate")}>
                Intermediate
              </Button>
              <Button onClick={() => onClick("Advanced")}>Advanced</Button>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </Card>
  );
};
