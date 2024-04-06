"use client";

import { useState } from "react";

import UabcHeaderText from "@/components/AuthLogin/UabcHeaderText";
import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";

export default function AccountPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="h-[100dvh] w-[100dvw] grid place-items-center">
      <div className="h-full w-[375px] pt-12 flex-col flex items-center justify-center">
        <UabcHeaderText />
        <p className="pt-24 text-center">What&apos;s your name?</p>
        <div className="pt-4">
          <div className="flex flex-col space-y-4 pb-40">
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
          <Button
            onClick={() => {
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
