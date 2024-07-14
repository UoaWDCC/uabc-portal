import { memo } from "react";
import Link from "next/link";

import { Card } from "@/components/Card";
import { OptionButtonUtils } from "@/components/ui/options-popover/OptionsButtonUtils";
import { OptionsPopover } from "@/components/ui/options-popover/OptionsPopover";
import { convertTo12HourFormat } from "@/lib/utils/dates";
import { DeleteSemesterFormDialog } from "./DeleteSemesterFormDialog";
import { EditSemesterFormDialog } from "./EditSemesterFormDialog";
import { useSemesterContext } from "./SemestersContext";

const UnmemoizedSemesterDetailCard = () => {
  const {
    id,
    name,
    startDate,
    endDate,
    breakStart,
    breakEnd,
    bookingOpenDay,
    bookingOpenTime,
  } = useSemesterContext();
  return (
    <Card
      className="relative select-none text-sm font-medium tracking-tight text-tertiary"
      variant="card"
    >
      <Link
        href={`semesters/${id}/schedules`}
        className="absolute left-0 top-0 z-10 h-full w-full"
      />
      <div className="flex items-center justify-between">
        <h3 className="truncate text-lg text-foreground">{name}</h3>
        <OptionsPopover>
          <OptionsPopover.DialogItem
            ButtonComponent={<OptionButtonUtils type="edit" />}
            DialogComponent={<EditSemesterFormDialog />}
          />
          <OptionsPopover.DialogItem
            ButtonComponent={<OptionButtonUtils type="delete" />}
            DialogComponent={<DeleteSemesterFormDialog />}
          />
        </OptionsPopover>
      </div>
      <p className="underline decoration-secondary/80 decoration-1 underline-offset-4">
        Bookings open {bookingOpenDay} at{" "}
        {convertTo12HourFormat(bookingOpenTime)}
      </p>
      <p className="mt-2">Start date: {startDate}</p>
      <p>End date: {endDate}</p>
      <p className="mt-2">
        Break period: {breakStart} - {breakEnd}
      </p>
    </Card>
  );
};

export const SemesterDetailCard = memo(UnmemoizedSemesterDetailCard);
