import React from "react";
import clsx from "clsx";

import { useOptionsDialogContext } from "@/components/ui/optionsPopover/OptionsPopover";
import {
  DialogCard,
  DialogCardFooter,
} from "@/components/ui/utils/DialogUtils";
import { useSemesterContext } from "./SemestersContext";

export const SemesterDeleteDialog = () => {
  const { name, id: semesterId } = useSemesterContext();
  const { handleClose: closeDialog } = useOptionsDialogContext();
  return (
    <DialogCard title={`Delete ${name}?`}>
      <p className="text-tertiary">
        Are you sure you want to delete this semester?
      </p>
      <div className="bg-destructive/20 w-full p-4 rounded-lg select-none">
        <p className="font-bold text-destructive">Warning</p>
        <p className="text-sm text-destructive">This action is irreversible.</p>
      </div>
      <DialogCardFooter
        variant="destructive"
        primaryText="Delete"
        secondaryText="No, Cancel"
      />
    </DialogCard>
  );
};
