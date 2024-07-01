import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { TextInput } from "@/components/TextInput";
import { useToast } from "@/components/ui/use-toast";
import {
  DialogCard,
  DialogCardFooter,
} from "@/components/ui/utils/DialogUtils";
import { formSchema } from "./utils";

interface CreateGameSessionFormDialogProps {
  title: string;
  date: string;
  onSuccess: () => void;
}

export function CreateGameSessionFormDialog({
  title,
  date,
  onSuccess,
}: CreateGameSessionFormDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate } = useMutation({
    mutationFn: async (body: BodyInit) => {
      const response = await fetch(`/api/game-sessions`, {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error();
    },
  });

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const body = JSON.stringify({
      ...data,
      date,
      startTime: `${data.startTime}:00`,
      endTime: `${data.endTime}:00`,
    });
    mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["game-session", date] });
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
    <DialogCard title={title}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2 ">
          <TextInput label="Booking Open" type="text" />
          <TextInput label="Booking Close" type="text" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <TextInput
            label="Start Time"
            type="time"
            {...register("startTime")}
            isError={!!errors.startTime}
            errorMessage={errors.startTime?.message}
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
        <DialogCardFooter type="submit" />
      </form>
    </DialogCard>
  );
}
