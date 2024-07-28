"use client";

import type { MouseEventHandler } from "react";

import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface MembershipTypeSelectorProps {
  selectedMembership: boolean | undefined;
  onClick: MouseEventHandler<HTMLInputElement>;
  heading: string;
  description1: string;
  description2: string;
}

export const MembershipTypeSelector = ({
  selectedMembership,
  onClick,
  heading,
  description1,
  description2,
}: MembershipTypeSelectorProps) => (
  <label>
    <Card
      variant={selectedMembership ? "primary" : "secondary"}
      className={cn("flex cursor-pointer flex-col shadow hover:opacity-90")}
    >
      <input
        type="radio"
        name="membership-type-selector"
        className="hidden"
        checked={selectedMembership}
        onClick={onClick}
      />

      <h2 className="text-lg font-medium">{heading}</h2>

      <div className={cn("text-sm opacity-70")}>
        <span>{description1}</span>
        <br />
        <span>{description2}</span>
      </div>
    </Card>
  </label>
);
