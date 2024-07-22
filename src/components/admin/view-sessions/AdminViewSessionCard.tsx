"use client";

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
  totalCapacity: number;
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
  totalCapacity,
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
      className={cn("relative flex flex-col gap-4 border", className)}
      variant="card"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-lg font-medium leading-none">{title}</p>
        {state === "upcoming" ? (
          <OptionsPopover>
            <OptionsPopover.DialogItem
              ButtonComponent={<OptionButtonUtils type="edit" />}
              DialogComponent={<EditGameSessionFormDialog />}
            />
            <OptionsPopover.DialogItem
              ButtonComponent={<OptionButtonUtils type="delete" />}
              DialogComponent={<DeleteGameSessionFormDialog />}
            />
          </OptionsPopover>
        ) : (
          <Badge
            className="pointer-events-none select-none"
            variant={state === "ongoing" ? "success" : "tertiary"}
          >
            {state === "ongoing" ? "Ongoing" : "Past"}
          </Badge>
        )}
      </div>
      <div className="mx-1 flex grow flex-col justify-center space-y-2 text-sm font-medium text-tertiary *:flex *:items-center *:gap-x-2">
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
            {attendees} / {totalCapacity} attendees
          </p>
        </div>
      </div>
      <Button
        className="w-full font-semibold"
        disabled={attendees === 0}
        onClick={handleButtonClick}
      >
        Download attendees list
      </Button>
    </Card>
  );
}
