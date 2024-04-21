"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

import { MembershipTypeButton } from "@/components/MembershipTypeButton";
import { Button } from "@/components/ui/button";
import { useOnboardingDetailsStore } from "@/stores/useOnboardingDetailsStore";

const MembershipType = () => {
  const member = useOnboardingDetailsStore((state) => state.member);
  const setMember = useOnboardingDetailsStore((state) => state.setMember);

  const handleButtonClick = (isMember: boolean) => {
    setMember(isMember);
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
    <div className="flex flex-col h-dvh mx-4 gap-y-4">
      <div className="flex mt-4">
        <button
          className="flex items-center px-4 hover:text-primary"
          onClick={handleBackButtonClick}
          style={{ fontSize: "1.5rem" }}
        >
          <IoArrowBackOutline />
        </button>
        <div className="text-lg font-medium">Select your membership type</div>
      </div>

      <MembershipTypeButton
        selectedMembership={member === true}
        onChange={() => handleButtonClick(true)}
        typeHeading="Prepaid Member"
        description1="Package of 6, 11 or 22 prepaid sessions for the semester"
        description2="(limit of 2 sessions per week)"
      />

      <MembershipTypeButton
        selectedMembership={member === false}
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
          disabled={member === undefined}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MembershipType;
