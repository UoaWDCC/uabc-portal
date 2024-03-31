/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { IoCheckmarkCircle } from "react-icons/io5";
import { twJoin } from "tailwind-merge";

import { cn } from "@/lib/utils";
import { Card } from "../Card";

type SelectSessionCardStatus = "default" | "selected" | "disabled";

export interface SelectSessionCardProps {
  weekday: number;
  startTime: string;
  endTime: string;
  locationName: string;
  status: SelectSessionCardStatus;
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
  ["disabled", "bg-secondary"],
]);

const textColorMap = new Map([
  ["default", "text-secondary-foreground"],
  ["selected", "text-primary-foreground"],
  ["disabled", "text-secondary-foreground"],
]);

export const SelectSessionCard = ({
  weekday,
  startTime,
  endTime,
  status,
  locationName,
}: SelectSessionCardProps) => (
  <Card
    className={cn(
      "border px-6 py-4 min-h-24 flex font-medium align-middle",
      backgroundColorMap.get(status),
      status === "disabled" && "opacity-50",
    )}
  >
    <div className={twJoin(textColorMap.get(status), "leading-5")}>
      <span className="text-lg leading-6">
        {weekdayMap.get(weekday)} {status === "disabled" && "(Session Full)"}
      </span>
      <br />
      <span className="opacity-60">
        {locationName} <br />
        <span className="uppercase tracking-tight">
          {startTime} - {endTime}
        </span>
      </span>
    </div>
    <div className="flex grow justify-end">
      {status === "selected" && (
        <IoCheckmarkCircle
          className="self-center ml-1"
          color="white"
          size={30}
        />
      )}
    </div>
  </Card>
);
