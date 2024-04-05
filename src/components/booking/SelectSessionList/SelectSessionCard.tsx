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

const weekdayColorMap = new Map([
  ["default", "text-secondary-foreground"],
  ["selected", "text-primary-foreground"],
  ["disabled", "text-secondary-foreground"],
]);

const textColorMap = new Map([
  ["default", "text-tertiary"],
  ["selected", "text-primary-foreground/70"],
  ["disabled", "text-tertiary"],
]);

type SelectSessionCardStatus = "default" | "selected" | "disabled";

interface SelectSessionCardProps {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  status: SelectSessionCardStatus;
}

function UnmemoizedSelectSessionCard({
  day,
  startTime,
  endTime,
  status,
  location,
}: SelectSessionCardProps) {
  const isSelected = status === "selected";
  const isDisabled = status === "disabled";
  return (
    <Card
      className={cn(
        "border px-6 py-4 min-h-24 flex align-middle leading-5",
        isSelected ? "bg-primary" : "bg-secondary",
        isDisabled && "opacity-40",
      )}
    >
      <div>
        <span
          className={twJoin(
            isSelected
              ? "text-primary-foreground"
              : "text-secondary-foreground",
            "text-lg font-medium leading-5",
          )}
        >
          {day} {isDisabled && "(Session Full)"}
        </span>
        <br />
        <span
          className={twJoin(
            isSelected ? "text-primary-foreground/70" : "text-tertiary",
            "text-sm",
          )}
        >
          {location} <br />
          <span className="uppercase">
            {startTime} - {endTime}
          </span>
        </span>
      </div>
      {isSelected && (
        <div className="flex grow justify-end">
          <IoCheckmarkCircle
            className="self-center ml-1"
            color="white"
            size={30}
          />
        </div>
      )}
    </Card>
  );
}

export const SelectSessionCard = memo(UnmemoizedSelectSessionCard);
