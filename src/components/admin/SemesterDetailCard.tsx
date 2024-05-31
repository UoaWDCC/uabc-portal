"use client";

import { createContext, memo } from "react";
import Link from "next/link";

import { Card } from "@/components/Card";
import OptionsPopoverButton from "../OptionButton";
import { OptionItemPopoverBase } from "../OptionItemPopoverBase";
import { OptionButtonUtils } from "../OptionsButtonUtils";
import SemesterDeleteDialog from "./SemesterDeleteDialog";
import { SemesterEditDialogue } from "./SemesterEditDialog";

type DetailCardProps = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
};
export const SemesterContext = createContext<DetailCardProps>(
  {} as DetailCardProps,
);

const UnmemoizedSemesterDetailCard = ({
  id,
  name,
  startDate,
  endDate,
  breakStart,
  breakEnd,
}: DetailCardProps) => {
  return (
    <SemesterContext.Provider
      value={{ id, name, startDate, endDate, breakStart, breakEnd }}
    >
      <Card className=" relative bg-secondary/20 ring-1 tracking-tight font-medium ring-secondary text-tertiary text-sm select-none">
        <Link
          href={`semesters/${id}`}
          className="absolute top-0 left-0 w-full h-full z-10"
        />
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-foreground whitespace-nowrap">{name}</h3>
          <OptionsPopoverButton>
            <OptionItemPopoverBase
              ButtonElem={<OptionButtonUtils type="edit" />}
              DialogElem={<SemesterEditDialogue />}
            />
            <OptionItemPopoverBase
              ButtonElem={<OptionButtonUtils type="delete" />}
              DialogElem={<SemesterDeleteDialog />}
            />
          </OptionsPopoverButton>
        </div>
        <p className="mt-2">Start date: {startDate}</p>
        <p>End date: {endDate}</p>
        <p className="mt-4">
          Break period: {breakStart} - {breakEnd}
        </p>
      </Card>
    </SemesterContext.Provider>
  );
};

export const SemesterDetailCard = memo(UnmemoizedSemesterDetailCard);
