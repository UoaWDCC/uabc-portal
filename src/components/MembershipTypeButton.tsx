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
      "flex",
      "flex-col",
      "py-[21px]",
      "px-8",
      "py-6",
      "shadow",
      "rounded",
      "hover:pointer",
      "cursor-pointer",
      selectedMembership
        ? "bg-primary text-secondary hover:bg-primary/90"
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
    <h2 className="text-medium pb-[3px] font-bold">{typeHeading}</h2>
    <p className="text-sm pb-[1.5px]">{description1}</p>
    <p className="text-sm">{description2}</p>
  </label>
);
