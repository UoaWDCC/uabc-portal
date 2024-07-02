import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "@/components/ui/use-toast";
import {
  DialogCard,
  DialogCardFooter,
  useDialogContext,
} from "@/components/ui/utils/DialogUtils";
import { useSemesterContext } from "./SemestersContext";

export const SemesterDeleteDialog = () => {
  const { name, id: semesterId } = useSemesterContext();
  const { handleClose: closeDialog } = useDialogContext();

  // React-query
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await fetch(`/api/semesters/${semesterId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        queryClient.invalidateQueries({ queryKey: ["semesters"] });
        toast({
          title: "Semester deleted!",
          description: `${name} has deleted`,
        });
        closeDialog();
      },
    });
  };

  return (
    <DialogCard title={`Delete ${name}?`}>
      <p className="text-tertiary">
        Are you sure you want to delete this semester?
      </p>
      <div className="bg-destructive/20 w-full p-4 rounded-lg select-none">
        <p className="font-bold text-destructive">Warning</p>
        <p className="text-sm text-destructive">This action is irreversible.</p>
      </div>
      <form onSubmit={onSubmit}>
        <DialogCardFooter
          variant="destructive"
          primaryText="Delete"
          secondaryText="No, Cancel"
        />
      </form>
    </DialogCard>
  );
};
