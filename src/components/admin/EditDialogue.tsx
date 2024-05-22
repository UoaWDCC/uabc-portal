import React, { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
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

  const onSubmit: SubmitHandler<EditSemesterFormValues> = (data) =>
    console.log(data);

  return (
    <form className="flex gap-4 flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 *:grow ">
        <TextInput
          label="Start Date"
          type="input"
          {...register("startDate", {
            required: "field is required",
          })}
          isError={!!errors.startDate?.message}
        />
        <TextInput
          label="End Date"
          type="input"
          {...register("endDate", { required: "field is required" })}
          isError={!!errors.endDate?.message}
        />
      </div>
      <div className="flex gap-2 *:grow">
        <TextInput
          label="Break start Date"
          type="input"
          {...register("breakStart", { required: "field is required" })}
          isError={!!errors.breakStart?.message}
        />
        <TextInput
          label="Break end Date"
          type="input"
          {...register("breakEnd", { required: "field is required" })}
          isError={!!errors.breakEnd?.message}
        />
      </div>
      <DialogFooter className="flex justify-end gap-2">
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
