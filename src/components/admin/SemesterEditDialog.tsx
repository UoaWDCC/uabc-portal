import React, { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";

import { TextInput } from "@/components/TextInput";
import { parseDate, validateDate } from "@/lib/utils";
import { DialogCard, DialogCardFooter, DialogContext } from "../DialogUtils";
import { PopoverContext } from "../popover";
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

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { handleClose } = useContext(DialogContext);

  const displayError = () => {
    const keys: string[] = Object.keys(errors);
    if (keys.length == 0) return;
    const err = errors[keys[0] as formValues]?.message;
    return `${keys[0]} ${err}`;
  };

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
      console.log(response);
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
        handleClose();
        reset({
          startDate: data.startDate,
          endDate: data.endDate,
          breakStart: data.breakStart,
          breakEnd: data.breakEnd,
        });
      },
    });
  };

  return (
    <DialogCard title={name} onClose={() => reset()}>
      <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 *:grow ">
          <TextInput
            label="Start Date"
            type="text"
            {...register("startDate", {
              required: "field is required",
              validate: {
                validateDate: (v) => validateDate(v) || "date is invalid",
              },
            })}
            isError={!!errors.startDate?.message}
          />
          <TextInput
            label="End Date"
            type="text"
            {...register("endDate", {
              required: "field is required",
              validate: {
                validateDate: (v) => validateDate(v) || "date is invalid",
              },
            })}
            isError={!!errors.endDate?.message}
          />
        </div>
        <div className="flex gap-2 *:grow">
          <TextInput
            label="Break start Date"
            type="text"
            {...register("breakStart", {
              required: "field is required",
              validate: {
                validateDate: (v) => validateDate(v) || "date is invalid",
              },
            })}
            isError={!!errors.breakStart?.message}
          />
          <TextInput
            label="Break end Date"
            type="text"
            {...register("breakEnd", {
              required: "field is required",
              validate: {
                validateDate: (v) => validateDate(v) || "date is invalid",
              },
            })}
            isError={!!errors.breakEnd?.message}
          />
        </div>
        <p className="text-destructive select-none">{displayError()}&nbsp;</p>
        <DialogCardFooter type="submit" />
      </form>
    </DialogCard>
  );
};
