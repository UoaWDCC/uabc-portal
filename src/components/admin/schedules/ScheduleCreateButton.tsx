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
        <Button variant="default" className="aspect-square">
          <Plus className="absolute w-5 stroke-white" />
        </Button>
      </DialogTrigger>
      <CreateScheduleFormDialog semesterId={semesterId} />
    </Dialog>
  );
};

export default ScheduleCreateButton;
