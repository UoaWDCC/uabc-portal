import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  useDialogContext,
} from "@/components/ui/dialog";
import { DialogButtonsFooter } from "@/components/ui/utils/DialogUtils";
import { compareDate, formatDateInISO, validateDate } from "@/lib/utils";
import { TextInput } from "../../TextInput";
import { useToast } from "../../ui/use-toast";
import { useSemesterContext } from "./SemestersContext";

// Schema
const formSchema = z
  .object({
    startDate: z
      .string()
      .min(1, "Field is required")
      .refine(validateDate, "Invalid date"),
    endDate: z
      .string()
      .min(1, "Field is required")
      .refine(validateDate, "Invalid date"),
    breakStart: z
      .string()
      .min(1, "Field is required")
      .refine(validateDate, "Invalid date"),
    breakEnd: z
      .string()
      .min(1, "Field is required")
      .refine(validateDate, "Invalid date"),
  })
  .refine((data) => compareDate(data.startDate, data.breakStart) < 0, {
    message: "Start date must be before break start date",
    path: ["startDate"],
  })
  .refine((data) => compareDate(data.breakStart, data.breakEnd) < 0, {
    message: "Break start date start must be before break end date",
    path: ["breakStart"],
  })
  .refine((data) => compareDate(data.breakEnd, data.endDate) < 0, {
    message: "Break end date must be before end date",
    path: ["breakEnd"],
  });

export const SemesterEditDialogue = () => {
  // Contexts
  const {
    name,
    startDate,
    endDate,
    breakStart,
    breakEnd,
    id: semesterId,
    bookingOpenDay,
    bookingOpenTime,
  } = useSemesterContext();
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
      startDate,
      endDate,
      breakStart,
      breakEnd,
    },
  });

  const { toast } = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (body: BodyInit) => {
      const response = await fetch(`/api/semesters/${semesterId}`, {
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        await response.text().then((text) => {
          throw new Error(text || "An error has occurred");
        });
      }
      return response.json();
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const body = JSON.stringify({
      name,
      bookingOpenDay,
      bookingOpenTime,
      startDate: formatDateInISO(data.startDate),
      endDate: formatDateInISO(data.endDate),
      breakStart: formatDateInISO(data.breakStart),
      breakEnd: formatDateInISO(data.breakEnd),
    });

    mutation.mutate(body, {
      onError: (e) => {
        console.log(e);
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
          title: "Success!",
          description: "Semester details successfully updated",
        });
        reset({
          startDate: data.startDate,
          endDate: data.endDate,
          breakStart: data.breakStart,
          breakEnd: data.breakEnd,
        });
        closeDialog();
      },
    });
  };

  return (
    <DialogContent onCloseAutoFocus={() => reset()}>
      <DialogHeader>
        <DialogTitle>Edit {name}</DialogTitle>
      </DialogHeader>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 *:grow ">
          <TextInput
            label="Start date"
            type="text"
            {...register("startDate")}
            isError={!!errors.startDate?.message}
            errorMessage={errors.startDate?.message}
            autoComplete="off"
          />
          <TextInput
            label="End date"
            type="text"
            {...register("endDate")}
            isError={!!errors.endDate?.message}
            errorMessage={errors.endDate?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Break start date"
            type="text"
            {...register("breakStart")}
            isError={!!errors.breakStart?.message}
            errorMessage={errors.breakStart?.message}
            autoComplete="off"
          />
          <TextInput
            label="Break end date"
            type="text"
            {...register("breakEnd")}
            isError={!!errors.breakEnd?.message}
            errorMessage={errors.breakEnd?.message}
            autoComplete="off"
          />
        </div>
        <DialogButtonsFooter
          type="submit"
          primaryText="Update"
          isPending={mutation.isPending}
        />
      </form>
    </DialogContent>
  );
};
