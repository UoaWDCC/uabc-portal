import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TextInput } from "../TextInput";
import { Button } from "../ui/button";

interface SignUpFormData {
  email: string;
  password: string;
}

const emailSchema = z.string().email({ message: "Invalid email" });
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/\d/, { message: "Password must contain a number" })
  .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" });

export const EmailSignUp = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(
      z.object({ email: emailSchema, password: passwordSchema }),
    ),
  });

  const onSubmit = async (formData: SignUpFormData) => {
    setButtonDisabled(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 400) {
      setError("email", {
        type: "manual",
        message: "Email already in use",
      });
    } else if (response.status == 500) {
      setError("email", {
        type: "manual",
        message: "Internal server error. Please try again.",
      });
    } else {
      setSuccess(true);
    }

    setButtonDisabled(false);
  };

  useEffect(() => {
    if (errors.email || errors.password) {
      setSuccess(false);
    }
  }),
    [errors];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-col flex gap-4">
        <span className="text-foreground text-center">Create an Account</span>
        <TextInput
          className="text-foreground"
          label="Email"
          type="email"
          isError={!!errors.email}
          isSuccess={success}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <TextInput
          label="Password"
          type="password"
          isError={!!errors.password}
          isSuccess={success}
          errorMessage={errors.password?.message}
          successMessage={"Account Created! Please log in now."}
          className="text-foreground"
          {...register("password")}
        />
        <Button large type="submit" disabled={buttonDisabled}>
          Sign Up with Email
        </Button>
      </div>
    </form>
  );
};
