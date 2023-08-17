/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { twJoin } from "tailwind-merge";
import Card from "../Card/Card";
import SessionCardProps from "./SessionCardProps";
import { SessionCardStatus } from "./SessionCardStatusEnum";
import { IoCheckmarkCircle } from "react-icons/io5";

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

const SessionCard = ({
  startDate,
  endDate,
  status,
  location,
  onChange,
}: SessionCardProps) => {
  const dayOfWeek = weekday[startDate.getDay()];
  const start_time = startDate
    .toLocaleTimeString([], { timeStyle: "short" })
    .toUpperCase();
  const end_time = endDate
    .toLocaleTimeString([], { timeStyle: "short" })
    .toUpperCase();

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
        <p className={twJoin("text-md pt-2", timeClassName)}>
          {start_time} - {end_time}
        </p>
      </div>
    </Card>
  );
};

export default SessionCard;
