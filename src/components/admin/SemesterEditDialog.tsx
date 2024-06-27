import React, { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { parseDate, validateDate } from "@/lib/utils";
import { DialogCard, DialogCardFooter } from "../DialogUtils";
import { OptionsDialogContext } from "../OptionsPopover";
import { TextInput } from "../TextInput";
import { useToast } from "../ui/use-toast";
import { SemesterContext } from "./SemestersContext";

const formSchema = z.object({
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
  } = useContext(SemesterContext);
  const { handleClose: closeDialog } = useContext(OptionsDialogContext);

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

  // React-query
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
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
      }
      return response.json();
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const body = JSON.stringify({
      name,
      bookingOpenDay,
      bookingOpenTime,
      startDate: parseDate(data.startDate),
      endDate: parseDate(data.endDate),
      breakStart: parseDate(data.breakStart),
      breakEnd: parseDate(data.breakEnd),
    });

    mutation.mutate(body, {
      onError: (e) => {
        console.log(e);
        toast({
          description: "An error occured",
          variant: "destructive",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["semesters"] });
        toast({
          description: "Success!",
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
    <DialogCard title={name} onClose={() => reset()}>
      <form className="flex gap-6 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 *:grow ">
          <TextInput
            label="Start Date"
            type="text"
            {...register("startDate")}
            isError={!!errors.startDate?.message}
            errorMessage={errors.startDate?.message}
          />
          <TextInput
            label="End Date"
            type="text"
            {...register("endDate")}
            isError={!!errors.endDate?.message}
            errorMessage={errors.endDate?.message}
          />
        </div>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Break start Date"
            type="text"
            {...register("breakStart")}
            isError={!!errors.breakStart?.message}
            errorMessage={errors.breakStart?.message}
          />
          <TextInput
            label="Break end Date"
            type="text"
            {...register("breakEnd")}
            isError={!!errors.breakEnd?.message}
            errorMessage={errors.breakEnd?.message}
          />
        </div>
        <DialogCardFooter type="submit" />
      </form>
    </DialogCard>
  );
};
