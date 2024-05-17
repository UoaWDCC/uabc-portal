import React from "react";
import { Trash2 } from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const DeleteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-destructive/20 h-8 text-destructive justify-start"
        >
          <Trash2 className="w-4 mr-2" />
          <p>Delete</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="dark sm:max-w-[475px] max-w-[375px] rounded-lg">
        <DialogHeader className="*:stroke-foreground">
          <DialogTitle className="text-foreground">
            Are you sure want to delete &quot;Semester 1 (2024)&quot;
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          {/* todo: send api call to delete schedules */}
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
