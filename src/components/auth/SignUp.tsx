import React, { useState } from "react";
import Error from "next/error";
import { z } from "zod";

import { TextInput } from "../TextInput";
import { Button } from "../ui/button";

const emailSchema = z.string().email({ message: "Invalid email" });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/\d/, { message: "Password must contain a number" })
  .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" });

export const SignUp = () => {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [emailSubText, setEmailSubText] = useState<string>("");
  const [passwordSubText, setPasswordSubText] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const editEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      emailSchema.parse(e.target.value);
    } catch (e) {
      setEmailSubText((e as z.ZodError).errors[0].message);
      setEmailError(true);
    }
  };

  const editPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      passwordSchema.parse(e.target.value);
    } catch (e) {
      setPasswordSubText((e as z.ZodError).errors[0].message);
      setPasswordError(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setButtonDisabled(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log({ response });
    if (response.status == 200) {
      setSuccess(true);
      setEmailError(false);
      setPasswordError(false);
      setEmailSubText("");
      setPasswordSubText("Account Created! Please log in now.");
    } else if (response.status == 400) {
      setEmailError(true);
      setEmailSubText("Email already in use");
      setPasswordError(true);
      setPasswordSubText("");
    } else {
      setEmailError(true);
      setEmailSubText("");
      setPasswordError(true);
      setPasswordSubText("Internal server error");
    }
    setButtonDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-col flex gap-4">
        <span className="text-foreground text-center">Create an Account</span>
        <TextInput
          className="text-foreground"
          label="Email"
          type="email"
          name="email"
          isError={emailError}
          isSuccess={success}
          subText={emailSubText}
          onBlur={editEmail}
        />
        <TextInput
          className="text-foreground"
          label="Password"
          type="password"
          name="password"
          isError={passwordError}
          isSuccess={success}
          subText={passwordSubText}
          onBlur={editPassword}
        />
        <Button large type="submit" disabled={buttonDisabled}>
          Sign Up with Email
        </Button>
      </div>
    </form>
  );
};
