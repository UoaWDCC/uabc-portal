import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type UserResponse = {
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
};

const EditDialogue = () => {
  const { register, handleSubmit } = useForm<UserResponse>({
    defaultValues: {
      startDate: "asdasd",
      endDate: "asdasd",
      breakStart: "asdasd",
      breakEnd: "asdasd",
    },
  });

  const onSubmit: SubmitHandler<UserResponse> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className="dark sm:max-w-[475px] max-w-[375px] rounded-lg">
        <DialogHeader className="*:stroke-foreground">
          <DialogTitle className="text-foreground">
            Edit Semester 1 (2024)
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 *:grow ">
          <TextInput
            label="Start Date"
            type="input"
            {...register("startDate", { required: true })}
          />
          <TextInput
            label="End Date"
            type="input"
            {...register("endDate", { required: true })}
          />
        </div>
        <div className="flex gap-2 *:grow *:ring-tertiary/70">
          <TextInput
            label="Break start Date"
            type="input"
            // {...register("breakStart", { required: true })}
          />
          <TextInput
            label="Break start Date"
            type="input"
            // {...register("breakEnd", { required: true })}
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
      </DialogContent>
    </form>
  );
};

export default EditDialogue;
