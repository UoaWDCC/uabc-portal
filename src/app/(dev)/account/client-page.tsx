"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BackNavigationBar } from "@/components/BackNavigationBar";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  firstName: z.string().min(1, "Field is required"),
  lastName: z.string().min(1, "Field is required"),
  playLevel: z.union([
    z.literal("beginner"),
    z.literal("intermediate"),
    z.literal("advanced"),
  ]),
});

export default function ClientAccountPage({
  firstName: initialFirstName,
  lastName: initialLastName,
  email: initialEmail,
  playLevel: initialPlayLevel,
  member,
}: ClientAccountPageProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: initialFirstName,
      lastName: initialLastName,
      playLevel: initialPlayLevel,
    },
  });

  const [email, setEmail] = useState(initialEmail);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Handle save functionality
    console.log("Saving user data:", data);
  };

  return (
    <div className="mx-4 flex h-dvh flex-col gap-y-4">
      <BackNavigationBar title="Account" pathName="/sessions" />

      <div className="absolute right-4 top-4 flex h-6 items-center justify-center rounded-full bg-tertiary px-4">
        <span className="text-center text-sm font-medium text-tertiary-foreground">
          {member ? "Member" : "Non-member"}
        </span>
      </div>

      <div className="flex flex-grow flex-col items-center justify-center">
        {/* Profile Settings Tab */}

        <div className="mb-4 w-full max-w-[460px] rounded-lg border p-6">
          <h2 className="mb-2 text-lg font-bold">Full Name</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextInput
              label="First Name"
              type="text"
              {...register("firstName")}
              isError={!!errors.firstName?.message}
              errorMessage={errors.firstName?.message}
            />
            <TextInput
              label="Last Name"
              type="text"
              {...register("lastName")}
              isError={!!errors.lastName?.message}
              errorMessage={errors.lastName?.message}
            />

            {/* Play Level Selector */}
            <h2 className="mb-2 text-lg font-bold">Play Level</h2>
            <div className="grid grid-cols-3 gap-2 rounded-md border border-tertiary p-2">
              {PLAY_LEVELS.map((level) => (
                <label key={level} className="flex items-center">
                  <input
                    type="radio"
                    value={level}
                    className="hidden"
                    {...register("playLevel")}
                  />
                  <span
                    className={cn(
                      "flex h-12 w-full cursor-pointer items-center justify-center rounded-md text-sm font-semibold capitalize",
                      watch("playLevel") === level
                        ? "bg-primary text-primary-foreground"
                        : "border-none bg-background text-foreground"
                    )}
                  >
                    {level}
                  </span>
                </label>
              ))}
            </div>

            <Button
              type="submit"
              className="mt-4 rounded px-4 py-2"
              disabled={!isDirty}
            >
              Save Changes
            </Button>
          </form>
        </div>

        {/* Email Address Tab */}
        <div className="mb-4 flex w-full max-w-[460px] flex-col items-start justify-between rounded-lg border p-6">
          <h2 className="mb-2 text-lg font-bold">Email Address</h2>
          <div className="flex w-full flex-col gap-2 break-words md:flex-row md:items-center md:justify-between">
            <p>{email}</p>
            <div>
              <Button variant={"outline"}>Change Email</Button>
            </div>
          </div>
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
