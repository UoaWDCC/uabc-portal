"use client";

import { useState } from "react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CreateGameSessionFormDialog } from "./CreateGameSessionFormDialog";
import { useGameSessionContext } from "./GameSessionContext";

interface EmptyAdminViewSessionCardProps {
  title: string;
  className?: string;
}

export function EmptyAdminViewSessionCard({
  title,
  className,
}: EmptyAdminViewSessionCardProps) {
  const [open, setOpen] = useState(false);
  const { date } = useGameSessionContext();

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
          <Button className="w-full font-semibold border" variant={"ghost"}>
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
