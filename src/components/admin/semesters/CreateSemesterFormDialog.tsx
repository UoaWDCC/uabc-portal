import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { weekdayEnum } from "@/lib/db/schema";
import { QUERY_KEY } from "@/lib/utils/queryKeys";
import { compareDate, formatDateInISO, validateDate } from "./utils";

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
    bookingOpenDay: z
      .string()
      .min(1, "Field is required")
      .refine(
        (value) => z.enum(weekdayEnum.enumValues).safeParse(value).success,
        { message: "Invalid day of week" }
      ),
    bookingOpenTime: z.string().min(1, "Field is required"),
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

export const CreateSemesterFormDialog = () => {
  const { handleClose: closeDialog } = useDialogContext();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (body: BodyInit) => {
      const response = await fetch("/api/semesters", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        await response.text().then((text) => {
          if (response.statusText == "nameError") {
            setError("name", { message: text });
          }
          throw new Error(text || "An has error occurred");
        });
      }
      return response.json();
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    const newSemester = JSON.stringify({
      name: data.name,
      startDate: formatDateInISO(data.startDate),
      endDate: formatDateInISO(data.endDate),
      breakStart: formatDateInISO(data.breakStart),
      breakEnd: formatDateInISO(data.breakEnd),
      bookingOpenDay: data.bookingOpenDay,
      bookingOpenTime: `${data.bookingOpenTime}:00`,
    });

    mutation.mutate(newSemester, {
      onError: (e) => {
        toast({
          title: "Uh oh! Something went wrong",
          description: `${e.message}.`,
          variant: "destructive",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SEMESTERS] });
        toast({
          title: "Success!",
          description: "successfully created semester",
        });
        reset();
        closeDialog();
      },
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create a new semester</DialogTitle>
      </DialogHeader>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Name"
          type="text"
          {...register("name")}
          isError={!!errors.name?.message}
          errorMessage={errors.name?.message}
          autoComplete="off"
        />
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Booking open day"
            type="text"
            {...register("bookingOpenDay")}
            isError={!!errors.bookingOpenDay?.message}
            errorMessage={errors.bookingOpenDay?.message}
            autoComplete="off"
            placeholder="Monday"
          />
          <TextInput
            label="Booking open time"
            type="time"
            className="min-w-0"
            {...register("bookingOpenTime")}
            isError={!!errors.bookingOpenTime?.message}
            errorMessage={errors.bookingOpenTime?.message}
            autoComplete="off"
            placeholder="09:00:00"
          />
        </div>
        <div className="flex gap-2 *:grow">
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

        <DialogButtonsFooter
          type="submit"
          primaryText="Create"
          isPending={mutation.isPending}
        />
      </form>
    </DialogContent>
  );
};
