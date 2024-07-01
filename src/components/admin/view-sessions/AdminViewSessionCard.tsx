"use client";

import { useState } from "react";
import { Clock, MapPin, Users } from "lucide-react";

import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OptionButtonUtils } from "@/components/ui/options-popover/OptionsButtonUtils";
import { OptionsPopover } from "@/components/ui/options-popover/OptionsPopover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { DeleteGameSessionFormDialog } from "./DeleteGameSessionFormDialog";
import EditGameSessionFormDialog from "./EditGameSessionFormDialog";

interface AdminViewSessionCardProps {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationAddress: string;
  attendees: number;
  capacity: number;
  state: "ongoing" | "past" | "upcoming";
  className?: string;
}

export function AdminViewSessionCard({
  id,
  title,
  startTime,
  endTime,
  locationName,
  locationAddress,
  attendees,
  capacity,
  state,
  className,
}: AdminViewSessionCardProps) {
  const { toast } = useToast();

  async function downloadAttendeesList() {
    const res = await fetch(`/api/game-sessions/${id}/download`);
    if (!res.ok) {
      throw new Error("Failed to download attendees list");
    }
    const fileContents = await res.blob();
    const a = document.createElement("a");
    const url = URL.createObjectURL(fileContents);
    a.href = url;
    a.download = `${title} attendees list.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleButtonClick() {
    try {
      await downloadAttendeesList();
    } catch {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
    }
  }

  return (
    <Card
      className={cn("relative p-4 flex flex-col gap-4 border", className)}
      variant="card"
    >
      <div className="flex justify-between gap-4 items-center">
        <p className="text-lg font-medium leading-none">{title}</p>
        {state === "upcoming" ? (
          //TODO: implement form to edit session
          <OptionsPopover>
            <OptionsPopover.DialogItem
              ButtonElement={<OptionButtonUtils type="edit" />}
              DialogElement={<EditGameSessionFormDialog />}
            />
            <OptionsPopover.DialogItem
              ButtonElement={<OptionButtonUtils type="delete" />}
              DialogElement={<DeleteGameSessionFormDialog />}
            />
          </OptionsPopover>
        ) : (
          <Badge
            className="select-none pointer-events-none"
            variant={state === "ongoing" ? "success" : "tertiary"}
          >
            {state === "ongoing" ? "Ongoing" : "Past"}
          </Badge>
        )}
      </div>
      <div className="*:flex *:items-center *:gap-x-2 space-y-2 text-sm font-medium text-tertiary mx-1">
        <div>
          <Clock size={24} className="min-w-6" />
          <p>
            {startTime} - {endTime}
          </p>
        </div>
        <div>
          <MapPin size={24} className="min-w-6" />
          <div className="leading-tight">
            {locationName} <br /> {locationAddress}
          </div>
        </div>
        <div>
          <Users size={24} className="min-w-6" />
          <p>
            {attendees} / {capacity} attendees
          </p>
        </div>
      </div>
      <Button
        className="w-full font-semibold"
        disabled={state === "upcoming"}
        onClick={handleButtonClick}
      >
        Download attendees list
      </Button>
    </Card>
  );
}
