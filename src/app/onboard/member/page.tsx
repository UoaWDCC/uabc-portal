"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

import { MembershipTypeSelector } from "@/components/MembershipTypeSelector";
import { Button } from "@/components/ui/button";
import { useOnboardingDetailsStore } from "@/stores/useOnboardingDetailsStore";

const MembershipType = () => {
  const member = useOnboardingDetailsStore((state) => state.member);
  const setMember = useOnboardingDetailsStore((state) => state.setMember);
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  const handleNextButtonClick = () => {
    router.push("/sessions");
  };

  return (
    <div className="flex flex-col h-dvh mx-4 gap-y-4">
      <div className="flex mt-4 align-middle text-tertiary">
        <Button
          variant={"ghost"}
          className="grid place-items-center mr-4 size-8"
          size={"icon"}
          onClick={handleBackButtonClick}
        >
          <IoArrowBackOutline size={24} />
        </Button>
        <span className="text-lg font-medium leading-none self-center">
          Select your membership type
        </span>
      </div>

      <MembershipTypeSelector
        selectedMembership={member === true}
        onChange={() => setMember(true)}
        heading="Prepaid Member"
        description1="Package of 6, 11 or 22 prepaid sessions for the semester"
        description2="(limit of 2 sessions per week)"
      />

      <MembershipTypeSelector
        selectedMembership={member === false}
        onChange={() => setMember(false)}
        heading="Non-Member (Casual)"
        description1="$15.00 per session"
        description2="(limit of 1 session per week)"
      />

      <div className="mb-10 flex flex-grow">
        <Button
          className="w-full self-end"
          onClick={handleNextButtonClick}
          disabled={member === null}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MembershipType;
