"use client";

import UabcHeaderText from "@/components/AuthLogin/UabcHeaderText";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { useAccountStore } from "@/stores/accountDetails";

export default function NamePage() {
  const firstName = useAccountStore((state) => state.firstName);
  const lastName = useAccountStore((state) => state.lastName);

  const updateFirstName = useAccountStore((state) => state.setFirstName);
  const updateLastName = useAccountStore((state) => state.setLastName);

  return (
    <div className="h-dvh w-dvw">
      <div className="mx-4 flex flex-col h-full justify-between">
        <div className="pt-4">
          <UabcHeaderText />
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-center">What&apos;s your name?</p>
          <TextInput
            label="First Name"
            value={firstName}
            type="text"
            isError={false}
            onChange={updateFirstName}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            type="text"
            isError={false}
            onChange={updateLastName}
          />
        </div>
        <div className="pb-10">
          <Button
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
