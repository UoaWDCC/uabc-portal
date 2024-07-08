import { useQueryClient } from "@tanstack/react-query";
import { getMonth, getYear } from "date-fns";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  useDialogContext,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { DialogButtonsFooter } from "@/components/ui/utils/DialogUtils";
import { useDeleteGameSessionMutation } from "@/hooks/mutations/game-sessions";
import { QUERY_KEY } from "@/lib/utils/queryKeys";
import { useGameSessionContext } from "./GameSessionContext";

export const DeleteGameSessionFormDialog = () => {
  const { date } = useGameSessionContext();
  const { handleClose } = useDialogContext();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate } = useDeleteGameSessionMutation();

  const handleSubmit = async () => {
    mutate(date, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GAME_SESSION, date],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.ACTIVE_DATES, getYear(date), getMonth(date)],
        });
        toast({
          title: "Success!",
          description: "Game session deleted successfully",
        });
        handleClose();
      },
      onError: () => {
        toast({
          title: "Uh oh! Something went wrong",
          description:
            "An error occurred while updating the game session. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Game Session?</DialogTitle>
      </DialogHeader>
      <p className="text-tertiary">
        Are you sure you want to delete this session?
      </p>
      <DialogButtonsFooter variant="destructive" onClick={handleSubmit} />
    </DialogContent>
  );
};
