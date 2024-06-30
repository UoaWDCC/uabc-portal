import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { TextInput } from "@/components/TextInput";
import { useOptionsDialogContext } from "@/components/ui/optionsPopover/OptionsPopover";
import { useToast } from "@/components/ui/use-toast";
import {
  DialogCard,
  DialogCardFooter,
} from "@/components/ui/utils/DialogUtils";
import { compareDate, parseNzDateToZodDate, validateDate } from "@/lib/utils";

//Schema
const formSchema = z
  .object({
    name: z.string().min(1, "Field is required"),
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
    message: "Start date must be less than break start date",
    path: ["startDate"],
  })
  .refine((data) => compareDate(data.breakStart, data.breakEnd) < 0, {
    message: "Break start date start must be less than break end date",
    path: ["breakStart"],
  })
  .refine((data) => compareDate(data.breakEnd, data.endDate) < 0, {
    message: "Break end date must be less than end date",
    path: ["breakEnd"],
  });

export const SemesterCreateDialog = () => {
  //Context
  const { handleClose: closeDialog } = useOptionsDialogContext();

  // Hook-forms
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "test",
      startDate: "21/02/2025",
      endDate: "11/08/2025",
      breakStart: "7/05/2025",
      breakEnd: "8/05/2025",
    },
  });
  const { toast } = useToast();

  // React-query
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (body: BodyInit) => {
      const response = await fetch(`/api/semesters`, {
        method: "POST",
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

  /* zod
  id: z.ZodOptional<z.ZodNumber>;
    name: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    breakStart: z.ZodString;
    breakEnd: z.ZodString;
    bookingOpenDay: z.ZodEnum<...>;
    bookingOpenTime: z.ZodString;
    createdAt: z.ZodOptional<...>;
*/
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const body = JSON.stringify({
      name: data.name,
      startDate: parseNzDateToZodDate(data.startDate),
      endDate: parseNzDateToZodDate(data.endDate),
      breakStart: parseNzDateToZodDate(data.breakStart),
      breakEnd: parseNzDateToZodDate(data.breakEnd),
      bookingOpenDay: "Monday",
      bookingOpenTime: "12:00:00",
      createdAt: new Date(),
    });

    console.log(body);
    mutation.mutate(body, {
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
    <DialogCard title="Create a new semester">
      <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          type="text"
          {...register("name")}
          isError={!!errors.name?.message}
          errorMessage={errors.name?.message}
          autoComplete="off"
        />
        <div className="flex gap-2 *:grow ">
          <TextInput
            label="Start date"
            type="text"
            {...register("startDate")}
            isError={!!errors.startDate?.message}
            errorMessage={errors.startDate?.message}
            autoComplete="off"
            placeholder="dd/MM/yyyy"
          />
          <TextInput
            label="End date"
            type="text"
            {...register("endDate")}
            isError={!!errors.endDate?.message}
            errorMessage={errors.endDate?.message}
            autoComplete="off"
            placeholder="dd/MM/yyyy"
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
            placeholder="dd/MM/yyyy"
          />
          <TextInput
            label="Break end date"
            type="text"
            {...register("breakEnd")}
            isError={!!errors.breakEnd?.message}
            errorMessage={errors.breakEnd?.message}
            autoComplete="off"
            placeholder="dd/MM/yyyy"
          />
        </div>
        <DialogCardFooter type="submit" primaryText="Create" />
      </form>
    </DialogCard>
  );
};
