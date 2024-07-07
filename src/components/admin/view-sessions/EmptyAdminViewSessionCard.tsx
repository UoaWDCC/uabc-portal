"use client";

import { useState } from "react";
import { isPast } from "date-fns";

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
    if (isPast(date)) {
      toast({
        title: "Date is in the past",
        description: "You can't create game sessions for dates in the past.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card
      className="flex flex-col gap-4 border p-4 text-tertiary/70"
      variant="card"
    >
      <div className="grid grow place-content-center text-center text-lg font-medium">
        No sessions found on <br />
        {formatTitle(date)}
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild>
          <Button
            className="w-full border font-semibold"
            variant={"ghost"}
            onClick={handleButtonClick}
          >
            Create session
          </Button>
        </DialogTrigger>
        {canCreate && !isPast(date) && (
          <CreateGameSessionFormDialog onSuccess={() => setOpen(false)} />
        )}
      </Dialog>
    </Card>
  );
}
