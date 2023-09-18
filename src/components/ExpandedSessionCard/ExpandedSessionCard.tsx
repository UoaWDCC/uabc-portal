/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import Card from "../Card/Card";
import ExpandedSessionCardProps from "./ExpandedSessionCardProps";
import { IoCheckmarkCircle } from "react-icons/io5";
import LevelSelector from "../LevelSelector/LevelSelector";
import { useState } from "react";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ExpandedSessionCard = ({
  startTime,
  endTime,
  location,
  address,
  level,
  setLevel,
  defaultLevel
}: Omit<ExpandedSessionCardProps, "id">) => {
  const [open, setOpen] = useState(false);

  const dayOfWeek = weekday[startTime.getDay()];

  return (
    <Card className="relative font-normal">
      <div className="px-6 py-4 bg-blue-600 rounded-t-md drop-shadow-lg pr-10">
        <div className="absolute right-5 top-10 -translate-y-1/2">
          <IoCheckmarkCircle color="white" size={30}></IoCheckmarkCircle>
        </div>
        <p className="text-xl text-white">{dayOfWeek}</p>
        <p className="text-md text-indigo-200">{location}</p>
      </div>
      <div className="px-6 py-8 bg-gray-200 text-md">
        <p className="text-md text-gray-800">Address</p>
        <p className="text-md text-gray-500">{address}</p>
        <p className="text-md mt-2 text-gray-800">Time</p>
        <p className="text-md uppercase text-gray-500">
          {startTime.toLocaleTimeString([], { timeStyle: "short" })} -{" "}
          {endTime.toLocaleTimeString([], { timeStyle: "short" })}
        </p>
      </div>
      <div className="bg-gray-500 py-2 text-center rounded-b-md">
        <button className="text-white capitalize w-full" onClick={() => setOpen(true)}>
          {level ?? "Select Play Level"}
        </button>
        <LevelSelector
          isOpened={open}
          onClose={() => setOpen(false)}
          onSelect={setLevel}
          default={defaultLevel}
        />
      </div>
    </Card>
  );
};

export default ExpandedSessionCard;
