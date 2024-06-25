"use client";

import { Clock, MapPin, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "../Card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface EmptyAdminViewSessionCardProps {
  title: string;

  className?: string;
}

export function EmptyAdminViewSessionCard({
  title,
  className,
}: EmptyAdminViewSessionCardProps) {
  async function handleButtonClick() {}

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
      <Button
        className="w-full font-semibold border"
        onClick={handleButtonClick}
        variant={"ghost"}
      >
        Create session
      </Button>
    </Card>
  );
}
