/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { twJoin } from "tailwind-merge";
import { Card } from "./Card";
import { IoCheckmarkCircle } from "react-icons/io5";
import { ChangeEvent } from "react";

export interface SessionCardProps {
  id: number;
  startTime: Date;
  endTime: Date;
  location: string;
  status: SessionCardStatus;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export enum SessionCardStatus {
  DEFAULT,
  SELECTED,
  DISABLED,
  UNAVAILABLE,
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

function CheckMark({ status }: { status: SessionCardStatus }) {
  return (
    <div className="absolute right-5 top-1/2 -translate-y-1/2">
      {status === SessionCardStatus.SELECTED && (
        <IoCheckmarkCircle color="white" size={30}></IoCheckmarkCircle>
      )}
    </div>
  );
}

export const SessionCard = ({
  startTime,
  endTime,
  status,
  location,
  onChange,
}: Omit<SessionCardProps, "id">) => {
  const dayOfWeek = weekday[startTime.getDay()];

  let cardClassName;
  let dayOfWeekClassName;
  let locationClassName;
  let timeClassName;

  // Exact colours to be adjusted
  switch (status) {
    case SessionCardStatus.SELECTED:
      cardClassName = "bg-blue-600";
      dayOfWeekClassName = "text-white";
      locationClassName = "text-indigo-200";
      timeClassName = "text-indigo-200";
      break;
    case SessionCardStatus.DISABLED:
      cardClassName = "bg-gray-100";
      dayOfWeekClassName = "text-gray-300";
      locationClassName = "text-gray-300";
      timeClassName = "text-gray-300";
      break;
    case SessionCardStatus.UNAVAILABLE:
      cardClassName = "bg-orange-700";
      dayOfWeekClassName = "text-white";
      locationClassName = "text-rose-200";
      timeClassName = "text-rose-200";
      break;
    default:
      cardClassName = "bg-gray-200";
      locationClassName = "text-gray-500";
      timeClassName = "text-gray-500";
  }

  return (
    <Card className={twJoin("relative px-6 py-4 font-normal", cardClassName)}>
      <input
        className={twJoin(
          "absolute h-full w-full -translate-x-6 -translate-y-4 opacity-0",
          status !== SessionCardStatus.DISABLED && "cursor-pointer",
        )}
        type="checkbox"
        onChange={onChange}
        disabled={status === SessionCardStatus.DISABLED}
      ></input>
      <CheckMark status={status}></CheckMark>
      <div className="pr-10">
        <p className={twJoin("text-xl", dayOfWeekClassName)}>{dayOfWeek}</p>
        <p className={twJoin("text-md", locationClassName)}>{location}</p>
        <p className={twJoin("text-md pt-2 uppercase", timeClassName)}>
          {startTime.toLocaleTimeString([], { timeStyle: "short" })} -{" "}
          {endTime.toLocaleTimeString([], { timeStyle: "short" })}
        </p>
      </div>
    </Card>
  );
};
