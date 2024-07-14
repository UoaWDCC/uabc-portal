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
import { TextInput } from "../../TextInput";
import { useToast } from "../../ui/use-toast";
import { useScheduleContext } from "./SchedulesContext";

// Schema
const formSchema = z
  .object({
    startTime: z.string().min(1, "Field is required"),
    endTime: z.string().min(1, "Field is required"),
    locationName: z.string().min(1, "Field is required"),
    locationAddress: z.string().min(1, "Field is required"),
    capacity: z.coerce
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
  )
  .refine(
    (data) => {
      return data.capacity >= data.casualCapacity;
    },
    {
      message: "Casual capacity must be less than or equal to capacity",
      path: ["casualCapacity"],
    }
  );

export const ScheduleEditDialogue = () => {
  // Contexts
  const {
    id,
    semesterId,
    weekday,
    startTime,
    endTime,
    locationName,
    locationAddress,
    capacity,
    casualCapacity,
  } = useScheduleContext();
  const { handleClose: closeDialog } = useDialogContext();

  // Hook-forms
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startTime,
      endTime,
      locationName,
      locationAddress,
      capacity,
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
      startTime:
        data.startTime === startTime ? startTime : `${data.startTime}:00`,
      endTime: data.endTime === endTime ? endTime : `${data.endTime}:00`,
      locationName: data.locationName,
      locationAddress: data.locationAddress,
      capacity: data.capacity,
      casualCapacity: data.casualCapacity,
    });

    mutate(
      { id, body },
      {
        onError: (e) => {
          console.log(e);
          toast({
            title: "Uh oh! Something went wrong",
            description:
              "An error occurred while updating the schedule. Please try again.",
            variant: "destructive",
          });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["schedules", semesterId],
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
            capacity: data.capacity,
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
        <DialogTitle>Edit {weekday}</DialogTitle>
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
            {...register("capacity")}
            isError={!!errors.capacity?.message}
            errorMessage={errors.capacity?.message}
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
          isPending={isPending}
        />
      </form>
    </DialogContent>
  );
};
