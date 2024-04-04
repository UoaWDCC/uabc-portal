/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { memo } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { twJoin } from "tailwind-merge";

import { cn } from "@/lib/utils";
import { Card } from "../../Card";

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

type SelectSessionCardStatus = "default" | "selected" | "disabled";

interface SelectSessionCardProps {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  status: SelectSessionCardStatus;
}

const UnmemoizedSelectSessionCard = ({
  day,
  startTime,
  endTime,
  status,
  location,
}: SelectSessionCardProps) => (
  <Card
    className={cn(
      "border px-6 py-4 min-h-24 flex font-medium align-middle",
      backgroundColorMap.get(status),
      status === "disabled" && "opacity-40",
    )}
  >
    <div className={twJoin(textColorMap.get(status), "leading-5")}>
      <span className="text-lg leading-6">
        {day} {status === "disabled" && "(Session Full)"}
      </span>
      <br />
      <span className="opacity-70">
        {location} <br />
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

export const SelectSessionCard = memo(UnmemoizedSelectSessionCard);
