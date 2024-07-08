import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { format, getMonth, getYear, parse } from "date-fns";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { TextInput } from "@/components/TextInput";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { DialogButtonsFooter } from "@/components/ui/utils/DialogUtils";
import { useCreateGameSessionMutation } from "@/hooks/mutations/game-sessions";
import { QUERY_KEY } from "@/lib/utils/queryKeys";
import { useGameSessionContext } from "./GameSessionContext";
import { formatTitle, gameSessionFormSchema } from "./utils";

interface CreateGameSessionFormDialogProps {
  onSuccess: () => void;
}

export function CreateGameSessionFormDialog({
  onSuccess,
}: CreateGameSessionFormDialogProps) {
  const { date, bookingOpen } = useGameSessionContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<z.infer<typeof gameSessionFormSchema>>({
    resolver: zodResolver(gameSessionFormSchema),
  });

  const { mutate } = useCreateGameSessionMutation();

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const onSubmit = (data: z.infer<typeof gameSessionFormSchema>) => {
    const body = JSON.stringify({
      ...data,
      date,
      startTime: `${data.startTime}:00`,
      endTime: `${data.endTime}:00`,
      bookingOpen: bookingOpen!,
      bookingClose: format(
        parse(data.startTime, "HH:mm", date),
        "yyyy-MM-dd HH:mm:ss"
      ),
    });
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.GAME_SESSION, date],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.ACTIVE_DATES, getYear(date), getMonth(date)],
        });
        toast({
          title: "Success!",
          description: "Game session created successfully",
        });
        onSuccess();
      },
      onError: () => {
        toast({
          title: "Uh oh! Something went wrong",
          description:
            "An error occurred while creating the game session. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{formatTitle(date)}</DialogTitle>
      </DialogHeader>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Booking Open"
            type="text"
            value={format(bookingOpen!, "dd/MM/yy hh:mma")}
            disabled
            readOnly
          />
          <TextInput
            label="Booking Close"
            type="text"
            value={
              watch("startTime") &&
              format(
                parse(watch("startTime"), "HH:mm", date),
                "dd/MM/yy hh:mma"
              )
            }
            disabled
            readOnly
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Start Time"
            type="time"
            {...register("startTime")}
            isError={!!errors.startTime}
            errorMessage={errors.startTime?.message}
            autoFocus
          />
          <TextInput
            label="End Time"
            type="time"
            {...register("endTime")}
            isError={!!errors.endTime}
            errorMessage={errors.endTime?.message}
          />
        </div>
        <TextInput
          label="Location Name"
          type="text"
          {...register("locationName")}
          isError={!!errors.locationName}
          errorMessage={errors.locationName?.message}
        />
        <TextInput
          label="Address"
          type="text"
          {...register("locationAddress")}
          isError={!!errors.locationAddress}
          errorMessage={errors.locationAddress?.message}
        />
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Capacity"
            type="text"
            {...register("capacity")}
            isError={!!errors.capacity}
            errorMessage={errors.capacity?.message}
          />
          <TextInput
            label="Casual Capacity"
            type="text"
            {...register("casualCapacity")}
            isError={!!errors.casualCapacity}
            errorMessage={errors.casualCapacity?.message}
          />
        </div>
        <DialogButtonsFooter type="submit" />
      </form>
    </DialogContent>
  );
}
