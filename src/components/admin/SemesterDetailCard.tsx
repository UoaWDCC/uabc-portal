"use client";

import { createContext } from "react";
import Link from "next/link";
import { Ellipsis } from "lucide-react";

import { Card } from "@/components/Card";
import { Popover, PopoverContainer, PopoverOpenButton } from "../popover";
import DeleteButton from "./DeleteButton";
import { EditButton } from "./EditButton";

type DetailCardProps = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
};
export const ScheduleContext = createContext<DetailCardProps>({});

export const SemesterDetailCard = ({
  id,
  name,
  startDate,
  endDate,
  breakStart,
  breakEnd,
}: DetailCardProps) => {
  return (
    // todo: switch dummy text with real game-session info
    <ScheduleContext.Provider
      value={{ id, name, startDate, endDate, breakStart, breakEnd }}
    >
      <Card className=" relative bg-secondary/20 ring-1 tracking-tight font-medium ring-secondary text-tertiary text-sm select-none">
        <Link
          href={`edit-sessions/${id}`}
          className="absolute top-0 left-0 w-full h-full z-10"
        />
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-foreground whitespace-nowrap">{name}</h3>
          <Popover>
            <PopoverOpenButton variant="outline" className="w-8 h-6 z-10">
              <Ellipsis className="stroke-tertiary absolute w-4" />
            </PopoverOpenButton>
            <PopoverContainer>
              <EditButton />
              <DeleteButton />
            </PopoverContainer>
          </Popover>
        </div>
        <p className="mt-2">Start date: {startDate}</p>
        <p>End date: {endDate}</p>
        <p className="mt-4">
          Break period: {breakStart} - {breakEnd}
        </p>
      </Card>
    </ScheduleContext.Provider>
  );
};
