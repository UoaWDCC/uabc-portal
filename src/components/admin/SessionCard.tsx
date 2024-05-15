"use client";

import { useState } from "react";
import { Ellipsis, Trash2 } from "lucide-react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { EditButton } from "./EditButton";
import { DialogDemo } from "./Test";

export const SessionCard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Popover = () => {
    return (
      <>
        {/* full screen div to close popover on click */}
        <div
          className="h-dvh w-dvw fixed left-0 top-0 z-40"
          onClick={handleClose}
        />
        <div className="absolute w-56 bg-background p-1 flex flex-col z-50 top-4 right-6 rounded-md shadow-lg ring-1 ring-secondary">
          <EditButton />
          <Button
            variant="ghost"
            className="hover:bg-destructive/20 h-8 text-destructive justify-start"
          >
            <Trash2 className="w-4 mr-2" />
            <p>Delete</p>
          </Button>
        </div>
      </>
    );
  };

  return (
    // todo: switch dummy text with real game-session info
    <Card className=" relative bg-secondary/20 ring-1 tracking-tight font-medium ring-secondary text-tertiary text-sm has-[:checked]:ring-primary has-[:checked]:ring-2 select-none">
      <input
        type="radio"
        name="session"
        className="absolute outline top-0 left-0 z-10 w-full h-full bg- opacity-0 cursor-pointer"
        value="id"
      />
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-foreground whitespace-nowrap">
          Semester 2 (2024)
        </h3>

        <Button variant="outline" className="w-8 h-6 z-10" onClick={handleOpen}>
          <Ellipsis className="stroke-tertiary absolute w-4" />
        </Button>
        {open && <Popover />}
      </div>
      <p className="mt-2">Start date: 22/11/24</p>
      <p>End date: 22/11/24</p>
      <p className="mt-4">Break period: 31/09/24 - 16/04/24</p>
    </Card>
  );
};
