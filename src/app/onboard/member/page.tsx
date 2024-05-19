"use client";

import { useRouter } from "next/navigation";

import { MembershipTypeSelector } from "@/components/MembershipTypeSelector";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { useOnboardingDetailsStore } from "@/stores/useOnboardingDetailsStore";

const MembershipType = () => {
  const member = useOnboardingDetailsStore((state) => state.member);
  const setMember = useOnboardingDetailsStore((state) => state.setMember);
  const router = useRouter();

  const handleNextButtonClick = () => {
    router.push("/sessions");
  };

  return (
    <div className="flex flex-col h-dvh mx-4 gap-y-4">
      <NavigationBar title="Select your membership type" />

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
