import React, { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { validateDate } from "@/lib/utils";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScheduleContext } from "./SemesterDetailCard";

type EditSemesterFormValues = {
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
};

type formValues = "startDate" | "endDate" | "breakStart" | "breakEnd";

const EditDialogue = () => {
  const { name } = useContext(ScheduleContext);
  return (
    <DialogContent className="dark sm:max-w-[475px] max-w-[375px] rounded-lg">
      <DialogHeader className="*:stroke-foreground">
        <DialogTitle className="text-foreground">{name}</DialogTitle>
      </DialogHeader>
      <EditForm />
    </DialogContent>
  );
};

const EditForm = () => {
  const { startDate, endDate, breakStart, breakEnd } =
    useContext(ScheduleContext);

  const {
    register,
    handleSubmit,
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
    <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 *:grow ">
        <TextInput
          label="Start Date"
          type="input"
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
          type="input"
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
          type="input"
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
          type="input"
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
      <DialogFooter className="flex gap-2 ">
        <DialogClose asChild>
          <Button variant="outline" className="text-foreground">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Confirm</Button>
      </DialogFooter>
    </form>
  );
};

export default EditDialogue;
