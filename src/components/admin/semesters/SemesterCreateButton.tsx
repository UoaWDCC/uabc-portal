"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateSemesterFormDialog } from "./CreateSemesterFormDialog";

const SemesterCreateButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="aspect-square">
          <Plus className="absolute w-5 stroke-white" />
        </Button>
      </DialogTrigger>
      <CreateSemesterFormDialog />
    </Dialog>
  );
};

export default SemesterCreateButton;
