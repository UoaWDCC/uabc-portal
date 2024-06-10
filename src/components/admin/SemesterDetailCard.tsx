"use client";

import { memo, useContext } from "react";
import Link from "next/link";

import { Card } from "@/components/Card";
import OptionsPopoverButton from "../OptionButton";
import { OptionItemPopoverBase } from "../OptionItemPopoverBase";
import { OptionButtonUtils } from "../OptionsButtonUtils";
import SemesterDeleteDialog from "./SemesterDeleteDialog";
import { SemesterEditDialogue } from "./SemesterEditDialog";
import { SemesterContext } from "./SemestersContext";

const UnmemoizedSemesterDetailCard = () => {
  const { id, name, startDate, endDate, breakStart, breakEnd } =
    useContext(SemesterContext);
  return (
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
  );
};

export const SemesterDetailCard = memo(UnmemoizedSemesterDetailCard);