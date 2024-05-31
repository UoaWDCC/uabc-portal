import React, { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { TextInput } from "@/components/TextInput";
import { validateDate } from "@/lib/utils";
import { DialogCard, DialogCardFooter } from "../DialogUtils";
import { SemesterContext } from "./SemesterDetailCard";

type EditSemesterFormValues = {
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
};

type formValues = "startDate" | "endDate" | "breakStart" | "breakEnd";

export const SemesterEditDialogue = () => {
  const { name, startDate, endDate, breakStart, breakEnd } =
    useContext(SemesterContext);

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

  const displayError = () => {
    const keys: string[] = Object.keys(errors);
    if (keys.length == 0) return;
    const err = errors[keys[0] as formValues]?.message;
    return `${keys[0]} ${err}`;
  };

  const onSubmit: SubmitHandler<EditSemesterFormValues> = (data) =>
    console.log(data);
  // todo add validation for greater and less than for start and end
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
