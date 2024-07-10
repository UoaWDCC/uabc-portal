import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  useDialogContext,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { DialogButtonsFooter } from "@/components/ui/utils/DialogUtils";
import { QUERY_KEY } from "@/lib/utils/queryKeys";
import { useSemesterContext } from "./SemestersContext";

export const DeleteSemesterFormDialog = () => {
  const { name, id: semesterId } = useSemesterContext();
  const { handleClose: closeDialog } = useDialogContext();

  // React-query
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/semesters/${semesterId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        await response.text().then((text) => {
          throw new Error(text || "An error has occurred");
        });
      }
      return response;
    },
  });

  const handleDelete = () => {
    mutation.mutate(undefined, {
      onError: () => {
        toast({
          title: "Uh oh! Something went wrong",
          description:
            "An error occurred while updating the semester. Please try again.",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SEMESTERS] });
        toast({
          title: "Semester deleted!",
          description: `${name} has deleted`,
        });
        closeDialog();
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete {name}?</DialogTitle>
      </DialogHeader>
      <p className="text-tertiary">
        Are you sure you want to delete this semester?
      </p>
      <div className="w-full select-none rounded-lg bg-destructive/20 p-4">
        <p className="font-bold text-destructive">Warning</p>
        <p className="text-sm text-destructive">
          By deleting this semester, all related game session schedules to it
          will also be deleted. This action is irreversible.
        </p>
      </div>
      <DialogButtonsFooter
        variant="destructive"
        primaryText="Delete"
        secondaryText="Cancel"
        isPending={mutation.isPending}
        onClick={handleDelete}
      />
    </DialogContent>
  );
};
