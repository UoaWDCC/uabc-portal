"use client";

import { useState } from "react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CreateGameSessionFormDialog } from "./CreateGameSessionFormDialog";

interface EmptyAdminViewSessionCardProps {
  title: string;
  date: string;
  className?: string;
}

export function EmptyAdminViewSessionCard({
  title,
  date,
  className,
}: EmptyAdminViewSessionCardProps) {
  async function handleButtonClick() {}

  const [open, setOpen] = useState(false);

  return (
    <Card
      className={cn(
        "p-4 flex flex-col gap-4 border text-tertiary/70",
        className,
      )}
      variant="card"
    >
      <div className="grow text-lg font-medium grid place-content-center text-center">
        No sessions found on <br />
        {title}
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button
            className="w-full font-semibold border"
            onClick={handleButtonClick}
            variant={"ghost"}
          >
            Create session
          </Button>
        </DialogTrigger>
        <CreateGameSessionFormDialog
          title={title}
          date={date}
          onSuccess={() => setOpen(false)}
        />
      </Dialog>
    </Card>
  );
}
