"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface MembershipOptionProps {
  selectedMembership: boolean | undefined;
  onChange: (isMember: boolean) => void;
  typeHeading: string;
  description1: string;
  description2: string;
}

export const MembershipTypeButton = ({
  selectedMembership,
  onChange,
  typeHeading,
  description1,
  description2,
}: MembershipOptionProps) => (
  <label
    className={cn(
      "flex flex-col px-6 py-4 shadow rounded cursor-pointer",
      selectedMembership
        ? "bg-primary text-primary-foreground hover:bg-primary/90"
        : "bg-secondary hover:bg-secondary/90",
    )}
  >
    <input
      type="radio"
      name="MembershipTypeButton"
      className="hidden"
      checked={selectedMembership}
      onChange={() => onChange(!selectedMembership)}
    />
    <h2 className="text-large pb-[3px] font-medium">{typeHeading}</h2>
    <p className="text-sm pb-[1.5px] text-primary-foreground/70">
      {description1}
    </p>
    <p className="text-sm text-primary-foreground/70">{description2}</p>
  </label>
);
