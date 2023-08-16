/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { twJoin } from "tailwind-merge";
import Card from "../Card/Card";
import SessionCardProps from "./SessionCardProps";
import { SessionCardStatus } from "./SessionCardStatusEnum";

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
    <div className="absolute right-7 top-1/2 -translate-y-1/2">
      {status === SessionCardStatus.SELECTED && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
        >
          <path
            d="M11.1591 0C5.01042 0 0 5.01042 0 11.1591C0 17.3077 5.01042 22.3181 11.1591 22.3181C17.3077 22.3181 22.3181 17.3077 22.3181 11.1591C22.3181 5.01042 17.3077 0 11.1591 0ZM16.4931 8.59247L10.1659 14.9197C10.0097 15.0759 9.79765 15.1652 9.57447 15.1652C9.35129 15.1652 9.13927 15.0759 8.98304 14.9197L5.82503 11.7616C5.50141 11.438 5.50141 10.9024 5.82503 10.5788C6.14864 10.2552 6.68427 10.2552 7.00789 10.5788L9.57447 13.1454L15.3102 7.40961C15.6338 7.086 16.1695 7.086 16.4931 7.40961C16.8167 7.73322 16.8167 8.2577 16.4931 8.59247Z"
            fill="white"
          />
        </svg>
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

  let cardClassName;;
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
