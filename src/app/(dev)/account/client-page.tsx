"use client";

import { useState } from "react";

import { BackNavigationBar } from "@/components/BackNavigationBar";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
import type { PlayLevel } from "@/types/types";

interface ClientAccountPageProps {
  firstName: string;
  lastName: string;
  email: string;
  playLevel: PlayLevel;
  selectedLevel?: PlayLevel;
  member: boolean;
}
// max-width = 450px
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

      {/* Profile Settings Tab */}
      <div className="mb-4 rounded-lg border p-6">
        <h2 className="mb-2 text-lg font-bold">Full Name</h2>
        <form className="space-y-4">
          <TextInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            type={""}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            type={""}
          />
          <h2 className="mb-2 text-lg font-bold">Play Level</h2>
          <div className="grid grid-cols-3 gap-2 rounded-md border border-tertiary p-2">
            {PLAY_LEVELS.map((level) => (
              <button
                key={level}
                className={`h-12 rounded-md bg-background text-sm font-semibold capitalize ${
                  playLevel === level
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-foreground"
                } ${playLevel === level ? "" : "border-none"}`}
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
      <div className="mb-4 flex items-center justify-between rounded-lg border p-6">
        <div>
          <h2 className="mb-2 text-lg font-bold">Email Address</h2>
          <p>{email}</p>
        </div>
        <Button variant={"outline"}>Change Email</Button>
      </div>

      {/* Password Tab */}
      <div className="mb-4 rounded-lg border p-6">
        <h2 className="mb-2 text-lg font-bold">Password</h2>
        <Button variant={"destructive"}>Change Password</Button>
      </div>
    </div>
  );
}

// const AccountPage = () => {
//   const { data: session } = useSession();
//   const firstName = useState(session?.user?.firstName || "");
//   const lastName = useState(session?.user?.lastName || "");
//   const playLevel = useState(session?.user?.playLevel || ""); // can use the PlayLevel type defined in @/types

//   // If we pass the props down from the currentUser object from a parent server component,
//   // then this shouldn't be necessary as we can define initial values in the TextInput components.
//   const email = useState(session?.user?.email || "");
//   const member = useState(session?.user?.member || "");

//   useEffect(() => {
//     if (session?.user) {
//       useOnboardingDetailsStore.setState({
//         firstName: session.user.firstName || "",
//         lastName: session.user.lastName || "",
//         // email: session.user.email || "",
//         // playLevel: (session.user.playLevel as "beginner" | "intermediate" | "advanced") || "beginner",
//       });
//       // setPlayLevel(session.user.playLevel || "beginner");
//       // setEmail(session.user.email || "");
//     }
//   }, [session]);

//   const handleSaveChanges = () => {
//     // Add save logic here, such as calling an API to update user profile
//     console.log("Changes saved:", { firstName, lastName, playLevel, email });
//   };

//   // const [hasChanges, setHasChanges] = useState(false);

//   return (
//     <div className="mx-4 flex h-dvh flex-col gap-y-4">
//       <BackNavigationBar
//         title="Account"
//         pathName="/onboarding/name" // need to check what should be the prev page
//       />

//       {/* Profile Settings Tab */}
//       <div className="mb-4 rounded-lg border p-6">
//         <h2 className="mb-2 text-lg font-bold">Full Name</h2>
//         {/* <TextInput
//             autoFocus
//             className="text-foreground"
//             label="Email"
//             type="email"
//             isError={!!errors.email}
//             {...register("email")}
//           /> */}
//         <TextInput
//           type="text"
//           className="mb-4 text-foreground"
//           label="First Name"
//           value={firstName}
//           onChange={(e) =>
//             useOnboardingDetailsStore.setState({ firstName: e.target.value })
//           }
//         />
//         <TextInput
//           type="text"
//           className="mb-4 text-foreground"
//           label="Last Name"
//           value={lastName}
//           onChange={(e) =>
//             useOnboardingDetailsStore.setState({ lastName: e.target.value })
//           }
//         />
//         <h2 className="mb-2 text-lg font-bold">Play Level</h2>
//         {/* <LevelSelector value={playLevel} onChange={setPlayLevel} /> */}

//         <Button
//           className="mt-4 rounded px-4 py-2"
//           onClick={handleSaveChanges}
//           // disabled=...?
//         >
//           Save Changes
//         </Button>
//       </div>

//       {/* Email Address Tab */}
//       <div className="mb-4 flex items-center justify-between rounded-lg border p-6">
//         <div>
//           <h2 className="mb-2 text-lg font-bold">Email Address</h2>
//           <p>{email}</p>
//         </div>
//         <Button className="bg-grey rounded border border-tertiary/70 px-4 py-2 text-black">
//           Change Email
//         </Button>
//       </div>

//       {/* Password Tab */}
//       <div className="mb-4 rounded-lg border p-6">
//         <h2 className="mb-2 text-lg font-bold">Password</h2>
//         <Button className="rounded bg-destructive px-4 py-2">
//           Change Password
//         </Button>
//       </div>
//     </div>
//   );
// };

// // export default AccountPage;
