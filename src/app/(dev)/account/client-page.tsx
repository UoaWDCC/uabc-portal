"use client";

import { useState } from "react";

import { BackNavigationBar } from "@/components/BackNavigationBar";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import type { PlayLevel } from "@/types/types";

interface ClientAccountPageProps {
  firstName: string;
  lastName: string;
  email: string;
  playLevel: PlayLevel;
  selectedLevel?: PlayLevel;
  member: boolean;
}

const PLAY_LEVELS: PlayLevel[] = ["beginner", "intermediate", "advanced"];

export default function ClientAccountPage({
  firstName: initialFirstName,
  lastName: initialLastName,
  email: initialEmail,
  playLevel: initialPlayLevel,
  member,
}: ClientAccountPageProps) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [playLevel, setPlayLevel] = useState<PlayLevel>(initialPlayLevel);

  const handleSave = () => {
    // Handle save functionality
    console.log("Saving user data:", {
      firstName,
      lastName,
      email,
      playLevel,
      member,
    });
  };

  return (
    <div className="mx-4 flex h-dvh flex-col gap-y-4">
      <BackNavigationBar title="Account" pathName="/onboarding/name" />

      <div className="absolute right-4 top-4 flex h-6 items-center justify-center rounded-full bg-tertiary px-4">
        <span className="text-center text-sm font-medium text-tertiary-foreground">
          {member ? "Member" : "Non-member"}
        </span>
      </div>

      <div className="flex flex-grow flex-col items-center justify-center">
        {/* Profile Settings Tab */}
        <div className="mb-4 w-full max-w-[460px] rounded-lg border p-6">
          <h2 className="mb-2 text-lg font-bold">Full Name</h2>
          <form className="space-y-4">
            <TextInput
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              type="text"
            />
            <TextInput
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              type="text"
            />

            {/* Play Level Selector */}
            <h2 className="mb-2 text-lg font-bold">Play Level</h2>
            <div className="grid grid-cols-3 gap-2 rounded-md border border-tertiary p-2">
              {PLAY_LEVELS.map((level) => (
                <button
                  key={level}
                  className={cn(
                    "h-12 rounded-md text-sm font-semibold capitalize",
                    playLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "border-none bg-background text-foreground"
                  )}
                  onClick={() => setPlayLevel(level)}
                  type="button" // Prevents form submission
                >
                  {level}
                </button>
              ))}
            </div>

            <Button
              className="mt-4 rounded px-4 py-2"
              onClick={handleSave}
              // disabled=...?
            >
              Save Changes
            </Button>
          </form>
        </div>

        {/* Email Address Tab */}
        <div className="mb-4 flex w-full max-w-[460px] items-center justify-between rounded-lg border p-6">
          <div>
            <h2 className="mb-2 text-lg font-bold">Email Address</h2>
            <p>{email}</p>
          </div>
          <Button variant={"outline"}>Change Email</Button>
        </div>

        {/* Password Tab */}
        <div className="mb-4 w-full max-w-[460px] rounded-lg border p-6">
          <h2 className="mb-2 text-lg font-bold">Password</h2>
          <Button variant={"destructive"}>Change Password</Button>
        </div>
      </div>
    </div>
  );
}
