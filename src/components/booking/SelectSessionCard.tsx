/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { twJoin } from "tailwind-merge";
import { Card } from "../Card";
import { IoCheckmarkCircle } from "react-icons/io5";
import { ChangeEvent, useRef } from "react";

type SelectSessionCardStatus =
  | "default"
  | "selected"
  | "disabled"
  | "unavailable";

export interface SelectSessionCardProps {
  id: number;
  weekday: number;
  startTime: string;
  endTime: string;
  locationName: string;
  status: SelectSessionCardStatus;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const weekdayMap = new Map([
  [0, "Sunday"],
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
]);

const backgroundColorMap = new Map([
  ["default", "bg-secondary"],
  ["selected", "bg-primary"],
  ["unavailable", "bg-destructive"],
  ["disabled", "bg-secondary"],
]);

const textColorMap = new Map([
  ["default", "text-secondary-foreground"],
  ["selected", "text-primary-foreground"],
  ["unavailable", "text-destructive-foreground"],
  ["disabled", "text-secondary-foreground"],
]);

export const SelectSessionCard = ({
  weekday,
  startTime,
  endTime,
  status,
  locationName,
  onChange,
}: Omit<SelectSessionCardProps, "id">) => {
  const isDisabled = status === "disabled";
  const isSelected = status === "selected";
  const inputRef = useRef(null);
  return (
    <Card
      className={twJoin(
        "relative border border-border px-6 py-4 font-normal",
        backgroundColorMap.get(status),
        isDisabled && "opacity-50",
      )}
    >
      {isSelected && (
        <IoCheckmarkCircle
          className="absolute right-5 top-1/2 -translate-y-1/2"
          color="white"
          size={30}
        ></IoCheckmarkCircle>
      )}
      <input
        className={twJoin(
          "absolute z-10 h-full w-full -translate-x-6 -translate-y-4 opacity-0",
          !isDisabled && "cursor-pointer",
        )}
        type="checkbox"
        onChange={onChange}
        disabled={isDisabled}
      />
      <div className="text-md pr-10">
        <p className={twJoin("text-xl", textColorMap.get(status))}>
          {weekdayMap.get(weekday)} {isDisabled && "(Session Full)"}
        </p>
        <p className={twJoin("opacity-70", textColorMap.get(status))}>
          {locationName}
        </p>
        <p
          className={twJoin(
            "pt-2 uppercase opacity-70",
            textColorMap.get(status),
          )}
        >
          {startTime} - {endTime}
        </p>
      </div>
    </Card>
  );
};
