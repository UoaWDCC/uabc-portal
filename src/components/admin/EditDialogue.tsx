import React from "react";
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

type UserResponse = {
  startDate: string;
  endDate: string;
  breakStart: string;
  breakEnd: string;
};

const EditDialogue = () => {
  console.log("rendered");
  return (
    <DialogContent className="dark sm:max-w-[475px] max-w-[375px] rounded-lg">
      <DialogHeader className="*:stroke-foreground">
        <DialogTitle className="text-foreground">
          Edit Semester 1 (2024)
        </DialogTitle>
      </DialogHeader>
      <EditForm />
    </DialogContent>
  );
};

const EditForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserResponse>({
    defaultValues: {
      startDate: "asd",
      endDate: "",
      breakStart: "",
      breakEnd: "",
    },
  });

  const onSubmit: SubmitHandler<UserResponse> = (data) => console.log(data);

  return (
    <>
      <form
        className="flex gap-4 flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(errors);
          handleSubmit((data) => {
            console.log("submitted");
            console.log(data);
          });
        }}
      >
        <div className="flex gap-2 *:grow ">
          <TextInput
            label="Start Date"
            type="input"
            {...register("startDate", { required: "field is required" })}
          />
          <TextInput
            label="End Date"
            type="input"
            {...register("endDate", { required: "field is required" })}
          />
        </div>
        <div className="flex gap-2 *:grow *:ring-tertiary/70">
          <TextInput
            label="Break start Date"
            type="input"
            {...register("breakStart", { required: "field is required" })}
          />
          <TextInput
            label="Break end Date"
            type="input"
            {...register("breakEnd", { required: "field is required" })}
          />
        </div>
        <p className="text-foreground">{errors.breakEnd?.message}</p>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="text-foreground">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default EditDialogue;
