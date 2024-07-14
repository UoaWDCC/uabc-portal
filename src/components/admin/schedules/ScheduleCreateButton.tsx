"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateScheduleFormDialog } from "./CreateScheduleFormDialog";

interface ScheduleCreateButtonProps {
  semesterId: number;
}

const ScheduleCreateButton = ({ semesterId }: ScheduleCreateButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="aspect-square border-2 border-secondary"
        >
          <Plus className="absolute w-5 stroke-foreground" />
        </Button>
      </DialogTrigger>
      <CreateScheduleFormDialog semesterId={semesterId} />
    </Dialog>
  );
};

export default ScheduleCreateButton;
