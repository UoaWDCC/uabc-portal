import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  useDialogContext,
} from "@/components/ui/dialog";
import { DialogButtonsFooter } from "@/components/ui/utils/DialogUtils";
import { useEditScheduleMutation } from "@/hooks/mutations/schedules";
import { QUERY_KEY } from "@/lib/utils/queryKeys";
import { TextInput } from "../../TextInput";
import { useToast } from "../../ui/use-toast";
import { useScheduleContext } from "./SchedulesContext";

const formSchema = z
  .object({
    startTime: z.string().min(1, "Field is required"),
    endTime: z.string().min(1, "Field is required"),
    locationName: z.string().min(1, "Field is required"),
    locationAddress: z.string().min(1, "Field is required"),
    memberCapacity: z.coerce
      .number({ message: "Capacity must be a number" })
      .nonnegative("Capacity must be positive")
      .refine((value) => value !== 0, { message: "Field is required" }),
    casualCapacity: z.coerce
      .number({ message: "Capacity must be a number" })
      .nonnegative("Capacity must be positive")
      .refine((value) => value !== 0, { message: "Field is required" }),
  })
  .refine(
    (data) => {
      return !data.endTime || data.startTime < data.endTime;
    },
    { message: "Start time must be before end time", path: ["startTime"] }
  );

export const EditScheduleFormDialog = () => {
  const {
    id,
    semesterId,
    weekday,
    startTime,
    endTime,
    locationName,
    locationAddress,
    memberCapacity,
    casualCapacity,
  } = useScheduleContext();
  const { handleClose: closeDialog } = useDialogContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime: startTime.slice(0, 5),
      endTime: endTime.slice(0, 5),
      locationName,
      locationAddress,
      memberCapacity,
      casualCapacity,
    },
  });

  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useEditScheduleMutation();

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const body = JSON.stringify({
      semesterId: semesterId,
      weekday: weekday,
      startTime: `${data.startTime}:00`,
      endTime: `${data.endTime}:00`,
      locationName: data.locationName,
      locationAddress: data.locationAddress,
      memberCapacity: data.memberCapacity,
      casualCapacity: data.casualCapacity,
    });

    mutate(
      { id, body },
      {
        onError: () => {
          toast({
            title: "Uh oh! Something went wrong",
            description:
              "An error occurred while updating the schedule. Please try again.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SCHEDULES, semesterId],
          });
          toast({
            title: "Success!",
            description: "Schedule details successfully updated",
          });
          reset({
            startTime: data.startTime,
            endTime: data.endTime,
            locationName: data.locationName,
            locationAddress: data.locationAddress,
            memberCapacity: data.memberCapacity,
            casualCapacity: data.casualCapacity,
          });
          closeDialog();
        },
      }
    );
  };

  return (
    <DialogContent onCloseAutoFocus={() => reset()}>
      <DialogHeader>
        <DialogTitle>Edit {weekday}&apos;s Schedule</DialogTitle>
      </DialogHeader>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
            type="number"
            {...register("memberCapacity")}
            isError={!!errors.memberCapacity?.message}
            errorMessage={errors.memberCapacity?.message}
            autoComplete="off"
          />
          <TextInput
            label="Casual Capacity"
            type="number"
            {...register("casualCapacity")}
            isError={!!errors.casualCapacity?.message}
            errorMessage={errors.casualCapacity?.message}
            autoComplete="off"
          />
        </div>
        <DialogButtonsFooter
          type="submit"
          primaryText="Update"
          disabled={isPending}
        />
      </form>
    </DialogContent>
  );
};
