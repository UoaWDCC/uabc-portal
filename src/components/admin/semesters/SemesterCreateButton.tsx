"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SemesterCreateDialog } from "./SemesterCreateDialog";

const SemesterCreateButton = () => {
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
      <SemesterCreateDialog />
    </Dialog>
  );
};

export default SemesterCreateButton;
