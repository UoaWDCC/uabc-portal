import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useOptionsDialogContext } from "@/components/ui/options-popover/OptionsPopover";
import { useToast } from "@/components/ui/use-toast";
import {
  DialogCard,
  DialogCardFooter,
} from "@/components/ui/utils/DialogUtils";
import { useGameSessionContext } from "./GameSessionContext";

export const DeleteGameSessionFormDialog = () => {
  const { date } = useGameSessionContext();
  const { handleClose } = useOptionsDialogContext();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (date: string) => {
      const response = await fetch(`/api/game-sessions?date=${date}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();
    },
  });

  const handleSubmit = async () => {
    mutate(date, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["game-session", date] });
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
    <DialogCard title="Delete Game Session?">
      <p className="text-tertiary">
        Are you sure you want to delete this session?
      </p>
      <DialogCardFooter variant="destructive" onClick={handleSubmit} />
    </DialogCard>
  );
};
