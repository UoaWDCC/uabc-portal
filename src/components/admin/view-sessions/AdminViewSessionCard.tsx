"use client";

import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";

import { Card } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OptionButtonUtils } from "@/components/ui/options-popover/OptionsButtonUtils";
import { OptionsPopover } from "@/components/ui/options-popover/OptionsPopover";
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
      <Link
        key={id}
        href={`/admin/view-sessions/${id}`}
        className={cn(attendees === 0 && "pointer-events-none")}
      >
        <Button className="w-full font-semibold" disabled={attendees === 0}>
          View attendees list
        </Button>
      </Link>
    </Card>
  );
}
