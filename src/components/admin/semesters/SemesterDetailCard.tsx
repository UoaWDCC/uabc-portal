import { memo } from "react";
import Link from "next/link";

import { Card } from "@/components/Card";
import { OptionButtonUtils } from "@/components/ui/optionsPopover/OptionsButtonUtils";
import { OptionsPopover } from "@/components/ui/optionsPopover/OptionsPopover";
import { SemesterDeleteDialog } from "./SemesterDeleteDialog";
import { SemesterEditDialogue } from "./SemesterEditDialog";
import { useSemesterContext } from "./SemestersContext";

const UnmemoizedSemesterDetailCard = () => {
  const { id, name, startDate, endDate, breakStart, breakEnd } =
    useSemesterContext();
  return (
    <Card className=" relative select-none bg-secondary/20 text-sm font-medium tracking-tight text-tertiary ring-1 ring-secondary">
      <Link
        href={`semesters/${id}`}
        className="absolute left-0 top-0 z-10 h-full w-full"
      />
      <div className="flex items-center justify-between">
        <h3 className="truncate text-lg text-foreground">{name}</h3>
        <OptionsPopover>
          <OptionsPopover.DialogItem
            ButtonComponent={<OptionButtonUtils type="edit" />}
            DialogComponent={<SemesterEditDialogue />}
          />
          <OptionsPopover.DialogItem
            ButtonComponent={<OptionButtonUtils type="delete" />}
            DialogComponent={<SemesterDeleteDialog />}
          />
        </OptionsPopover>
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
