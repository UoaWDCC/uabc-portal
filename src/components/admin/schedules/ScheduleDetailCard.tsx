import { memo } from "react";

import { Card } from "@/components/Card";
import { OptionButtonUtils } from "@/components/ui/options-popover/OptionsButtonUtils";
import { OptionsPopover } from "@/components/ui/options-popover/OptionsPopover";
import { convertTo12HourFormat } from "@/lib/utils/dates";
import { DeleteScheduleFormDialog } from "./DeleteScheduleFormDialog";
import { EditScheduleFormDialog } from "./EditScheduleFormDialog";
import { useScheduleContext } from "./SchedulesContext";

const UnmemoizedScheduleDetailCard = () => {
  const {
    weekday,
    startTime,
    endTime,
    locationName,
    locationAddress,
    memberCapacity,
    casualCapacity,
  } = useScheduleContext();
  return (
    <Card
      className="relative select-none bg-secondary/20 text-sm font-medium tracking-tight text-tertiary"
      variant="card"
    >
      <div className="flex items-center justify-between">
        <h3 className="truncate text-lg text-foreground">{weekday}</h3>
        <OptionsPopover>
          <OptionsPopover.DialogItem
            ButtonComponent={<OptionButtonUtils type="edit" />}
            DialogComponent={<EditScheduleFormDialog />}
          />
          <OptionsPopover.DialogItem
            ButtonComponent={<OptionButtonUtils type="delete" />}
            DialogComponent={<DeleteScheduleFormDialog />}
          />
        </OptionsPopover>
      </div>
      <p>
        Session Time: {convertTo12HourFormat(startTime)} -{" "}
        {convertTo12HourFormat(endTime)}
      </p>
      <p className="mt-2">Venue Name: {locationName}</p>
      <p>Address: {locationAddress}</p>
      <p className="mt-2">Member capacity: {memberCapacity}</p>
      <p>Casual capacity: {casualCapacity}</p>
    </Card>
  );
};

export const ScheduleDetailCard = memo(UnmemoizedScheduleDetailCard);
