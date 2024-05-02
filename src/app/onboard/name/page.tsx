"use client";

import { TextInput } from "@/components/TextInput";
import { UabcHeaderText } from "@/components/UabcHeaderText";
import { Button } from "@/components/ui/button";
import { useOnboardingDetailsStore } from "@/stores/useOnboardingDetailsStore";

export default function NamePage() {
  const firstName = useOnboardingDetailsStore((state) => state.firstName);
  const lastName = useOnboardingDetailsStore((state) => state.lastName);

  const updateFirstName = useOnboardingDetailsStore(
    (state) => state.setFirstName,
  );
  const updateLastName = useOnboardingDetailsStore(
    (state) => state.setLastName,
  );

  return (
    <div className="h-dvh w-dvw">
      <div className="mx-4 flex flex-col h-full justify-between">
        <div className="pt-4">
          <UabcHeaderText />
        </div>
        <div className="py-6 flex flex-col gap-6">
          <p className="text-center">What&apos;s your name?</p>
          <TextInput
            label="First Name"
            value={firstName}
            type="text"
            isError={false}
            onChange={(e) => updateFirstName(e.target.value)}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            type="text"
            isError={false}
            onChange={(e) => updateLastName(e.target.value)}
          />
        </div>
        <div className="pb-10">
          <Button
            large
            className="w-full"
            onClick={() => {
              // Go to membership type selection page
            }}
            disabled={firstName === "" || lastName === "" ? true : false}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
