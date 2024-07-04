/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { memo } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { twJoin } from "tailwind-merge";

import { cn } from "@/lib/utils";
import { Card } from "../../Card";

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
        "flex min-h-24 align-middle leading-5",
        isDisabled && "opacity-40"
      )}
      variant={isSelected ? "primary" : "secondary"}
    >
      <div>
        <span className="text-lg font-medium leading-5">
          {day} {isDisabled && "(Session Full)"}
        </span>
        <br />
        <span
          className={twJoin(
            isSelected ? "text-primary-foreground/70" : "text-tertiary",
            "text-sm"
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
            className="ml-1 self-center"
            color="white"
            size={30}
          />
        </div>
      )}
    </Card>
  );
}

export const SelectSessionCard = memo(UnmemoizedSelectSessionCard);
