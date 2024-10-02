import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { TextInput } from "@/components/TextInput";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  useDialogContext,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { DialogButtonsFooter } from "@/components/ui/utils/DialogUtils";
import { useCreateScheduleMutation } from "@/hooks/mutations/schedules";
import { weekdayEnum } from "@/lib/db/schema";
import { QUERY_KEY } from "@/lib/utils/queryKeys";

interface ScheduleCreateDialogProps {
  semesterId: number;
}

const formSchema = z
  .object({
    weekday: z.enum(weekdayEnum.enumValues, { message: "Expected weekday" }),
    startTime: z.string().min(1, "Field is required"),
    endTime: z.string().min(1, "Field is required"),
    locationName: z.string().min(1, "Field is required"),
    locationAddress: z.string().min(1, "Field is required"),
    memberCapacity: z.coerce
      .number({ message: "Capacity must be a number" })
      .nonnegative("Capacity must be positive"),
    casualCapacity: z.coerce
      .number({ message: "Capacity must be a number" })
      .nonnegative("Capacity must be positive"),
  })
  .refine(
    (data) => {
      return !data.endTime || data.startTime < data.endTime;
    },
    { message: "Start time must be before end time", path: ["startTime"] }
  );

export const CreateScheduleFormDialog = ({
  semesterId,
}: ScheduleCreateDialogProps) => {
  const { handleClose: closeDialog } = useDialogContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useCreateScheduleMutation();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const body = JSON.stringify({
      weekday: data.weekday,
      startTime: `${data.startTime}:00`,
      endTime: `${data.endTime}:00`,
      locationName: data.locationName,
      locationAddress: data.locationAddress,
      memberCapacity: data.memberCapacity,
      casualCapacity: data.casualCapacity,
    });

    mutate(
      {
        semesterId,
        body,
      },
      {
        onError: () => {
          toast({
            title: "Uh oh! Something went wrong",
            description:
              "An error occurred while creating the schedule. Please try again.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SCHEDULES, semesterId],
          });
          toast({
            title: "Success!",
            description: "Successfully created schedule",
          });
          reset();
          closeDialog();
        },
      }
    );
  };

  const handleCancel = () => {
    reset();
    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new schedule</DialogTitle>
      </DialogHeader>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Day"
            type="text"
            {...register("weekday")}
            isError={!!errors.weekday?.message}
            errorMessage={errors.weekday?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Start Time"
            type="time"
            {...register("startTime")}
            isError={!!errors.startTime?.message}
            errorMessage={errors.startTime?.message}
            autoComplete="off"
          />
          <TextInput
            label="End Time"
            type="time"
            {...register("endTime")}
            isError={!!errors.endTime?.message}
            errorMessage={errors.endTime?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Venue Name"
            type="text"
            {...register("locationName")}
            isError={!!errors.locationName?.message}
            errorMessage={errors.locationName?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Address"
            type="text"
            {...register("locationAddress")}
            isError={!!errors.locationAddress?.message}
            errorMessage={errors.locationAddress?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Capacity"
            type="text"
            {...register("memberCapacity")}
            isError={!!errors.memberCapacity?.message}
            errorMessage={errors.memberCapacity?.message}
            autoComplete="off"
          />
          <TextInput
            label="Casual Capacity"
            type="text"
            {...register("casualCapacity")}
            isError={!!errors.casualCapacity?.message}
            errorMessage={errors.casualCapacity?.message}
            autoComplete="off"
          />
        </div>
        <DialogButtonsFooter
          type="submit"
          primaryText="Create"
          disabled={isPending}
          onCancel={handleCancel}
        />
      </form>
    </DialogContent>
  );
};
