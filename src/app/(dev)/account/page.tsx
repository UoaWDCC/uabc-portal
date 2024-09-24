"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { LevelSelector } from "@/components/booking/sessions/ExpandedSessionCard/LevelSelector";
import { NavigationBar } from "@/components/NavigationBar";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import { useOnboardingDetailsStore } from "@/stores/useOnboardingDetailsStore";

// import { Card } from "@/components/Card";

const AccountPage = () => {
  const { data: session } = useSession();
  const firstName = useOnboardingDetailsStore((state) => state.firstName);
  const lastName = useOnboardingDetailsStore((state) => state.lastName);
  const [playLevel, setPlayLevel] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");
  // const [playLevel, setPlayLevel] = useState(session?.user?.playLevel || "beginner");
  // const [playLevel, setPlayLevel] = useState<"beginner" | "intermediate" | "advanced">(
  //   (session?.user?.playLevel as "beginner" | "intermediate" | "advanced") || "beginner"
  // );
  const [email, setEmail] = useState(session?.user?.email || "");
  const member = useOnboardingDetailsStore((state) => state.member);

  useEffect(() => {
    if (session?.user) {
      useOnboardingDetailsStore.setState({
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        // email: session.user.email || "",
        // playLevel: (session.user.playLevel as "beginner" | "intermediate" | "advanced") || "beginner",
      });
      // setPlayLevel(session.user.playLevel || "beginner");
      // setEmail(session.user.email || "");
    }
  }, [session]);

  const handleSaveChanges = () => {
    // Add save logic here, such as calling an API to update user profile
    console.log("Changes saved:", { firstName, lastName, playLevel, email });
  };

  // const [hasChanges, setHasChanges] = useState(false);

  return (
    <div className="mx-4 flex h-dvh flex-col gap-y-4">
      <NavigationBar
        title="Account"
        pathName="/onboarding/name" // to check what should be the prev page
      />

      {/* Profile Settings Tab */}
      <div className="mb-4 rounded-lg border p-6">
        <h2 className="mb-2 text-lg font-bold">Full Name</h2>
        {/* <TextInput
            autoFocus
            className="text-foreground"
            label="Email"
            type="email"
            isError={!!errors.email}
            {...register("email")}
          /> */}
        <TextInput
          type="text"
          className="mb-4 text-foreground"
          label="First Name"
          value={firstName}
          onChange={(e) =>
            useOnboardingDetailsStore.setState({ firstName: e.target.value })
          }
        />
        <TextInput
          type="text"
          className="mb-4 text-foreground"
          label="Last Name"
          value={lastName}
          onChange={(e) =>
            useOnboardingDetailsStore.setState({ lastName: e.target.value })
          }
        />
        <h2 className="mb-2 text-lg font-bold">Play Level</h2>
        {/* <LevelSelector value={playLevel} onChange={setPlayLevel} /> */}

        <Button
          className="mt-4 rounded px-4 py-2"
          onClick={handleSaveChanges}
          // disabled=...?
        >
          Save Changes
        </Button>
      </div>

      {/* Email Address Tab */}
      <div className="mb-4 flex items-center justify-between rounded-lg border p-6">
        <div>
          <h2 className="mb-2 text-lg font-bold">Email Address</h2>
          <p>{email}</p>
        </div>
        <Button className="bg-grey rounded border border-tertiary/70 px-4 py-2 text-black">
          Change Email
        </Button>
      </div>

      {/* Password Tab */}
      <div className="mb-4 rounded-lg border p-6">
        <h2 className="mb-2 text-lg font-bold">Password</h2>
        <Button className="rounded bg-destructive px-4 py-2">
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default AccountPage;
