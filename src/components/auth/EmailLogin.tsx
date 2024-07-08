import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TextInput } from "../TextInput";
import { Button } from "../ui/button";

interface SignUpFormData {
  email: string;
  password: string;
}

const emailSchema = z.string().email();

interface EmailLoginProps {
  onLoginOpen: () => void;
  loginOpen: boolean;
}

export const EmailLogin = ({ onLoginOpen, loginOpen }: EmailLoginProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(loginOpen);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>();

  const onSubmit = async (formData: SignUpFormData) => {
    try {
      setButtonDisabled(true);

      // Check if email and password are valid
      if (
        formData.email === "" ||
        formData.password === "" ||
        !emailSchema.safeParse(formData.email)
      ) {
        throw new Error("Invalid email or password");
      }

      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!response?.error) {
        router.push("/sessions");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch {
      setButtonDisabled(false);
      setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <span className="text-center text-foreground">
          Login to your account
        </span>
        <TextInput
          className="text-foreground"
          label="Email"
          type="email"
          isError={!!errors.email}
          {...register("email")}
        />
        <TextInput
          className="text-foreground"
          label="Password"
          type="password"
          isError={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("password")}
        />
        <Button large type="submit" disabled={buttonDisabled}>
          Login with Email
        </Button>
      </div>
    </form>
  );
};
