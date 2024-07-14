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
import { QUERY_KEY } from "@/lib/utils/queryKeys";
import { useScheduleContext } from "./SchedulesContext";

export const DeleteScheduleFormDialog = () => {
  const { id, weekday, semesterId } = useScheduleContext();
  const { handleClose: closeDialog } = useDialogContext();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteScheduleMutation();

  const handleDelete = () => {
    mutate(
      { id },
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
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SCHEDULES, semesterId],
          });
          toast({
            title: "Schedule deleted!",
            description: `${weekday} has been deleted`,
          });
          closeDialog();
        },
      }
    );
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete {weekday}&apos;s Schedule?</DialogTitle>
      </DialogHeader>
      <p className="text-tertiary">
        Are you sure you want to delete this schedule?
      </p>
      <DialogButtonsFooter
        variant="destructive"
        primaryText="Delete"
        secondaryText="Cancel"
        disabled={isPending}
        onClick={handleDelete}
      />
    </DialogContent>
  );
};
