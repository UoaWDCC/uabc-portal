import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";

import { TextInput } from "../TextInput";
import { Button } from "../ui/button";

const emailSchema = z.string().email();

interface EmailLoginProps {
  onLoginOpen: () => void;
  loginOpen: boolean;
}

export const EmailLogin = ({ onLoginOpen, loginOpen }: EmailLoginProps) => {
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(loginOpen);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisabled(true);

    const formData = new FormData(e.target as HTMLFormElement);

    // Check if email and password are valid
    if (
      formData.get("email") === "" ||
      formData.get("password") === "" ||
      !emailSchema.safeParse(formData.get("email") as string)
    ) {
      setError(true);
      setButtonDisabled(false);
      return;
    }

    const response = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    console.log({ response });
    if (!response?.error) {
      setError(false);
      router.push("/sessions");
    } else {
      setError(true);
      setButtonDisabled(false);
    }
  };

  function openEmailLogin() {
    onLoginOpen();
    setOpen(true);
  }

  if (!open)
    return (
      <Button large onClick={openEmailLogin}>
        Login with Email
      </Button>
    );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-col flex gap-4">
        <span className="text-foreground text-center">
          Login to your account
        </span>
        <TextInput
          className="text-foreground"
          label="Email"
          name="email"
          type="email"
          isError={error}
        />
        <TextInput
          className="text-foreground"
          label="Password"
          name="password"
          type="password"
          isError={error}
          subText={error ? "Invalid Email or Password" : ""}
        />
        <Button large type="submit" disabled={buttonDisabled}>
          Login with Email
        </Button>
      </div>
    </form>
  );
};
