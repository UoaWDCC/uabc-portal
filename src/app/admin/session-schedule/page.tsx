"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Ellipsis, Plus, SquarePen, Trash2 } from "lucide-react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex px-4 h-dvh w-dvw flex-col bg-background">
      <div className="py-4 flex justify-between">
        <div className="flex items-center">
          <Link
            href="/admin"
            className="h-full aspect-square grid place-items-center rounded-full hover:bg-tertiary/10 bg-[#0000] transition-color"
          >
            <ArrowLeft className="stroke-tertiary" />
          </Link>
          <div className="ml-3 text-tertiary text-lg font-medium">
            Edit schedules
          </div>
        </div>
        <Button
          variant="outline"
          className="border-2 aspect-square border-secondary"
        >
          <Plus className="absolute stroke-foreground w-5" />
        </Button>
      </div>
      <div className="gap-4 flex flex-col">
        <SessionCard />
        <SessionCard />
      </div>
    </div>
  );
};

const SessionCard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Popover = () => {
    return (
      <div className="absolute w-56 bg-background p-1 flex flex-col z-50 top-4 right-6 rounded-md shadow-lg ring-1 ring-secondary">
        <Button
          variant="ghost"
          className="hover:bg-secondary h-8 text-foreground justify-start"
        >
          <SquarePen className="w-4 mr-2" />
          <p>Edit</p>
        </Button>
        <Button
          variant="ghost"
          className="hover:bg-destructive/20 h-8 text-destructive justify-start"
        >
          <Trash2 className="w-4 mr-2" />
          <p>Delete</p>
        </Button>
      </div>
    );
  };

  return (
    <>
      <Card className="overflow-hidden relative bg-secondary/20 ring-1 tracking-tight font-medium ring-secondary text-tertiary text-sm has-[:checked]:ring-primary has-[:checked]:ring-2 select-none">
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
          <Button
            variant="outline"
            className="w-8 h-6 z-10 relative"
            onClick={handleOpen}
            onBlur={handleClose}
          >
            <Ellipsis className="stroke-tertiary absolute w-4" />
          </Button>
          {open && <Popover />}
        </div>
        <p className="mt-2">Start date: 13/08/24</p>
        <p>End date: 22/11/24</p>
        <p className="mt-2">Break period: 31/09/24 - 16/04/24</p>
      </Card>
    </>
  );
};

export default page;
