import React from "react";

import {
  DialogCard,
  DialogCardFooter,
} from "@/components/ui/utils/DialogUtils";

export const SemesterDeleteDialog = () => {
  return (
    <DialogCard title="Delete Semester?">
      <p className="text-tertiary">
        Are you sure you want to delete this session?
      </p>
      <DialogCardFooter variant="destructive" />
    </DialogCard>
  );
};
