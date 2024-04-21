"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

import { Button } from "@/components/Button";
import { MembershipTypeButton } from "@/components/MembershipTypeButton";

const MembershipType = () => {
  const [selectedMembership, setSelectedMembership] = useState<
    boolean | undefined
  >(undefined);

  const handleButtonClick = (isMember: boolean) => {
    setSelectedMembership(isMember);
  };

  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  const handleNextButtonClick = () => {
    // Navigate to the home page
    router.push("/");
  };

  return (
    <div className="flex flex-col h-dvh mx-4 gap-y-6">
      <div className="flex mt-4">
        <button
          className="flex items-center px-4 hover:text-primary"
          onClick={handleBackButtonClick}
        >
          <IoArrowBackOutline />
        </button>
        <div className="text-lg font-medium">Select your membership type</div>
      </div>

      <MembershipTypeButton
        selectedMembership={selectedMembership === true}
        onChange={() => handleButtonClick(true)}
        typeHeading="Prepaid Member"
        description1="Package of 6, 11 or 22 prepaid sessions for the semester"
        description2="(limit of 2 sessions per week)"
      />

      <MembershipTypeButton
        selectedMembership={selectedMembership === false}
        onChange={() => handleButtonClick(false)}
        typeHeading="Non-Member (Casual)"
        description1="$15.00 per session"
        description2="(limit of 1 session per week)"
      />

      <div className="flex-grow" />

      <div className="mb-10">
        <Button
          className="w-full"
          onClick={handleNextButtonClick}
          disabled={selectedMembership === undefined}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MembershipType;
