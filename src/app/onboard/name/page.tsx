"use client";

import { useState } from "react";

import UabcHeaderText from "@/components/AuthLogin/UabcHeaderText";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";
import { useAccountStore } from "@/stores/accountDetails";

export default function NamePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const updateFirstName = useAccountStore((state) => state.setFirstName);
  const updateLastName = useAccountStore((state) => state.setLastName);

  return (
    <div className="h-[100dvh] w-[100dvw]">
      <div className="mx-4 flex flex-col h-full justify-between">
        <div className="pt-4">
          <UabcHeaderText />
        </div>
        <div className="flex flex-col space-y-4">
          <p className="text-center">What&apos;s your name?</p>
          <TextInput
            label="First Name"
            value={firstName}
            type="firstName"
            isError={false}
            onChange={setFirstName}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            type="lastName"
            isError={false}
            onChange={setLastName}
          />
        </div>
        <div className="pb-10">
          <Button
            className="w-full"
            onClick={() => {
              updateFirstName(firstName);
              updateLastName(lastName);
              // Go to membership type selection page
            }}
            disabled={firstName == "" || lastName == "" ? true : false}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
