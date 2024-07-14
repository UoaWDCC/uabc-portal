import { memo } from "react";

import { Card } from "@/components/Card";
import { OptionButtonUtils } from "@/components/ui/options-popover/OptionsButtonUtils";
import { OptionsPopover } from "@/components/ui/options-popover/OptionsPopover";
import { ScheduleDeleteDialog } from "./ScheduleDeleteDialog";
import { ScheduleEditDialogue } from "./ScheduleEditDialog";
import { useScheduleContext } from "./SchedulesContext";

const UnmemoizedScheduleDetailCard = () => {
  const {
    weekday,
    startTime,
    endTime,
    locationName,
    locationAddress,
    capacity,
    casualCapacity,
  } = useScheduleContext();
  return (
    <Card className="relative select-none bg-secondary/20 text-sm font-medium tracking-tight text-tertiary ring-1 ring-secondary">
      <div className="flex items-center justify-between">
        <h3 className="truncate text-lg text-foreground">{weekday}</h3>
        <OptionsPopover>
          <OptionsPopover.DialogItem
            ButtonComponent={<OptionButtonUtils type="edit" />}
            DialogComponent={<ScheduleEditDialogue />}
          />
          <OptionsPopover.DialogItem
            ButtonComponent={<OptionButtonUtils type="delete" />}
            DialogComponent={<ScheduleDeleteDialog />}
          />
        </OptionsPopover>
      </div>
      <p className="mt-2">
        {startTime} - {endTime}
      </p>
      <p className="mt-4">{locationName}</p>
      <p className="mt-2">{locationAddress}</p>
      <p className="mt-4">Max {capacity} attendees</p>
      <p className="mt-2">Max {casualCapacity} casuals</p>
    </Card>
  );
};

export const ScheduleDetailCard = memo(UnmemoizedScheduleDetailCard);
