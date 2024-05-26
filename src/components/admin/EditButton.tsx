import React from "react";
import { SquarePen } from "lucide-react";

import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { SemesterEditDialogue } from "./SemesterEditDialog";

export const EditButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-secondary h-8 text-foreground justify-start w-full"
        >
          <SquarePen className="w-4 mr-2" />
          <p>Edit</p>
        </Button>
      </DialogTrigger>
      <SemesterEditDialogue />
    </Dialog>
  );
};
