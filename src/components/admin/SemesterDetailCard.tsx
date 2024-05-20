"use client";

import { createContext, useState } from "react";
import Link from "next/link";
import { Ellipsis } from "lucide-react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { PopoverContainer } from "../PopoverContainer";
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
  const Popover = () => {
    return (
      <PopoverContainer>
        <EditButton />
        <DeleteButton />
      </PopoverContainer>
    );
  };

  return (
    // todo: switch dummy text with real game-session info
    <ScheduleContext.Provider
      value={{ id, name, startDate, endDate, breakStart, breakEnd }}
    >
      <Card className=" relative bg-secondary/20 ring-1 tracking-tight font-medium ring-secondary text-tertiary text-sm has-[:checked]:ring-primary has-[:checked]:ring-2 select-none">
        <Link
          href={`edit-sessions/${id}`}
          className="absolute top-0 left-0 w-full h-full z-10"
        />

        {/* <input
          type="radio"
          name="session"
          className="absolute outline top-0 left-0 z-10 w-full h-full bg- opacity-0 cursor-pointer"
          value="id"
        /> */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-foreground whitespace-nowrap">{name}</h3>

          <Button variant="outline" className="w-8 h-6 z-10">
            <Ellipsis className="stroke-tertiary absolute w-4" />
          </Button>
          <Popover />
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
