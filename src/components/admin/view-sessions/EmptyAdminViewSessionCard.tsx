"use client";

import { useState } from "react";

import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { CreateGameSessionFormDialog } from "./CreateGameSessionFormDialog";
import { useGameSessionContext } from "./GameSessionContext";
import { formatTitle } from "./utils";

export function EmptyAdminViewSessionCard() {
  const [open, setOpen] = useState(false);
  const { date, canCreate } = useGameSessionContext();
  const { toast } = useToast();

  function handleButtonClick() {
    if (!canCreate) {
      toast({
        title: "No semester found for this date",
        description:
          "You can only create game sessions during an active semester.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card
      className="p-4 flex flex-col gap-4 border text-tertiary/70"
      variant="card"
    >
      <div className="grow text-lg font-medium grid place-content-center text-center">
        No sessions found on <br />
        {formatTitle(date)}
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button
            className="w-full font-semibold border"
            variant={"ghost"}
            onClick={handleButtonClick}
          >
            Create session
          </Button>
        </DialogTrigger>
        {canCreate && (
          <CreateGameSessionFormDialog onSuccess={() => setOpen(false)} />
        )}
      </Dialog>
    </Card>
  );
}
