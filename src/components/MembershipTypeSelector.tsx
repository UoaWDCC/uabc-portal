"use client";

import type { ChangeEventHandler } from "react";

import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface MembershipTypeSelectorProps {
  selectedMembership: boolean | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  heading: string;
  description1: string;
  description2: string;
}

// the description should be text-primary-foreground/70 when its selected, and text-secondary-foreground/70 when its not selected
// the header text though should still be text-primary-foreground and text-secondary-foreground respectively without the opacity

export const MembershipTypeSelector = ({
  selectedMembership,
  onChange,
  heading,
  description1,
  description2,
}: MembershipTypeSelectorProps) => (
  <label>
    <Card
      variant={selectedMembership ? "primary" : "secondary"}
      className={cn("flex flex-col shadow cursor-pointer hover:opacity-90")}
    >
      <input
        type="radio"
        name="membership-type-selector"
        className="hidden"
        checked={selectedMembership}
        onChange={onChange}
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
