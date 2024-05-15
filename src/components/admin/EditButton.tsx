import React from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { SquarePen } from "lucide-react";

import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const EditButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-secondary h-8 text-foreground justify-start w-full"
        >
          <SquarePen className="w-4 mr-2" />
          <p>Edit</p>s
        </Button>
      </DialogTrigger>
      <DialogContent className="dark max-w-[375px] rounded-lg">
        <DialogHeader className="*:stroke-foreground">
          <DialogTitle className="text-foreground">
            Edit Semester 1 (2024)
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 *:grow ">
          <TextInput label="Start Date" type="input" />
          <TextInput label="End Date" type="input" />
        </div>
        <div className="flex gap-2 *:grow *:ring-tertiary/70">
          <TextInput label="Break start Date" type="input" />
          <TextInput label="Break start Date" type="input" />
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="text-foreground">
              Cancel
            </Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
