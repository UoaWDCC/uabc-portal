import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";

import { parseDate, validateDate } from "@/lib/utils";
import { DialogCard, DialogCardFooter, DialogInputField } from "../DialogUtils";
import { DialogContext } from "../OptionItemPopoverBase";
import { useToast } from "../ui/use-toast";
import { SemesterContext } from "./SemestersContext";

type EditSemesterFormValues = {
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
};

type formValues = "startDate" | "endDate" | "breakStart" | "breakEnd";

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
  const { handleClose } = useContext(DialogContext);

  // Hook-forms
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditSemesterFormValues>({
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

  const onSubmit: SubmitHandler<EditSemesterFormValues> = async (
    data: EditSemesterFormValues,
  ) => {
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
      onError: () => {
        toast({
          description: "An error occured",
          variant: "destructive",
          duration: 2000,
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["semesters"] });
        toast({
          description: "Success!",
          duration: 2000,
        });
        reset({
          startDate: data.startDate,
          endDate: data.endDate,
          breakStart: data.breakStart,
          breakEnd: data.breakEnd,
        });
        handleClose();
      },
    });
  };

  return (
    <DialogCard title={name} onClose={() => reset()}>
      <form className="flex gap-5 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 *:grow ">
          <DialogInputField
            label="Start Date"
            type="text"
            {...register("startDate", {
              required: "field is required",
              validate: {
                validateDate: (v) => validateDate(v) || "date is invalid",
              },
            })}
            errorMessage={errors.startDate?.message}
          />
          <DialogInputField
            label="End Date"
            type="text"
            {...register("endDate", {
              required: "field is required",
              validate: {
                validateDate: (v) => validateDate(v) || "date is invalid",
              },
            })}
            errorMessage={errors.endDate?.message}
          />
        </div>
        <div className="flex gap-2 *:grow">
          <DialogInputField
            label="Break start Date"
            type="text"
            {...register("breakStart", {
              required: "field is required",
              validate: {
                validateDate: (v) => validateDate(v) || "date is invalid",
              },
            })}
            errorMessage={errors.breakStart?.message}
          />
          <DialogInputField
            label="Break end Date"
            type="text"
            {...register("breakEnd", {
              required: "field is required",
              validate: {
                validateDate: (v) => validateDate(v) || "date is invalid",
              },
            })}
            errorMessage={errors.breakEnd?.message}
          />
        </div>
        <DialogCardFooter type="submit" />
      </form>
    </DialogCard>
  );
};
