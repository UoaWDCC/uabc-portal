/**
 * @author Moeka Nakane <mnak534@aucklanduni.ac.nz>
 */

import { twJoin } from "tailwind-merge";

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
    className={twJoin(
      "border px-6 py-4 font-normal",
      backgroundColorMap.get(status),
      status === "disabled" && "opacity-50",
    )}
  >
    <div className="pr-10">
      <p className={twJoin("text-xl", textColorMap.get(status))}>
        {weekdayMap.get(weekday)} {status === "disabled" && "(Session Full)"}
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
