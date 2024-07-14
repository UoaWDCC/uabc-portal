import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  useDialogContext,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { DialogButtonsFooter } from "@/components/ui/utils/DialogUtils";
import { useDeleteScheduleMutation } from "@/hooks/mutations/schedules";
import { useScheduleContext } from "./SchedulesContext";

export const ScheduleDeleteDialog = () => {
  const { weekday, semesterId } = useScheduleContext();
  const { handleClose: closeDialog } = useDialogContext();

  // React-query
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteScheduleMutation();

  const handleDelete = () => {
    mutate(
      { semesterId },
      {
        onError: () => {
          toast({
            title: "Uh oh! Something went wrong",
            description:
              "An error occurred while deleting the schedule. Please try again.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["schedules"] });
          toast({
            title: "Schedule deleted!",
            description: `${weekday} has deleted`,
          });
          closeDialog();
        },
      }
    );
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete {weekday}?</DialogTitle>
      </DialogHeader>
      <p className="text-tertiary">
        Are you sure you want to delete this schedule?
      </p>
      <div className="w-full select-none rounded-lg bg-destructive/20 p-4">
        <p className="font-bold text-destructive">Warning</p>
        <p className="text-sm text-destructive">
          By deleting this schedule, all related game sessions to it will also
          be deleted. This action is irreversible.
        </p>
      </div>
      <DialogButtonsFooter
        variant="destructive"
        primaryText="Delete"
        secondaryText="Cancel"
        isPending={isPending}
        onClick={handleDelete}
      />
    </DialogContent>
  );
};
