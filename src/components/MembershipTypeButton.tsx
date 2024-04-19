"use client";

import React from "react";

interface MembershipOptionProps {
  selectedMembership: boolean | undefined;
  onClick: (isMember: boolean) => void;
  typeHeading: string;
  description1: string;
  description2: string;
}

export const MembershipTypeButton: React.FC<MembershipOptionProps> = ({
  selectedMembership,
  onClick,
  typeHeading,
  description1,
  description2,
}) => (
  <label
    className={`flex flex-col py-[21px] px-8 mb-[24px] h-32 shadow rounded hover:pointer cursor-pointer ${
      selectedMembership
        ? "bg-primary text-secondary hover:bg-primary/90 hover:text-secondary"
        : "bg-secondary hover:bg-primary/90 hover:text-secondary"
    }`}
    onClick={() => onClick(!selectedMembership)}
    htmlFor="MembershipTypeButton"
  >
    <input
      type="radio"
      name="MembershipTypeButton"
      className="hidden"
      checked={selectedMembership}
    />
    <h2 className="text-lg text-left pb-[3px] font-bold text-wrap">
      {typeHeading}
    </h2>
    <p className="text-sm pb-[1.5px]">{description1}</p>
    <p className="text-sm">{description2}</p>
  </label>
);
