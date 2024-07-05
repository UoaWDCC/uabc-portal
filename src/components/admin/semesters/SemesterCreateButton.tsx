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
          className="border-2 aspect-square border-secondary"
        >
          <Plus className="absolute stroke-foreground w-5" />
        </Button>
      </DialogTrigger>
      <SemesterCreateDialog />
    </Dialog>
  );
};

export default SemesterCreateButton;
