import React from "react";
import { Trash2 } from "lucide-react";

import { DialogCard, DialogCardFooter } from "../DialogUtils";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

const DeleteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-destructive/20 h-8 text-destructive w-full justify-start"
        >
          <Trash2 className="w-4 mr-2" />
          <p>Delete</p>
        </Button>
      </DialogTrigger>
      <DialogCard title="Delete Semester?">
        <p className="text-tertiary">
          Are you sure you want to delete this session?
        </p>
        <DialogCardFooter variant="destructive" />
      </DialogCard>
    </Dialog>
  );
};

export default DeleteButton;
