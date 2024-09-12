"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// import { useViewport } from "../../hooks/useViewport";
import { TextInput } from "../TextInput";
import { Button } from "../ui/button";

interface SignUpFormData {
  email: string;
  password: string;
}

const emailSchema = z.string().email();

export const EmailLoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  // const { width } = useViewport();

  const [open, setOpen] = useState<boolean>(
    searchParams.get("open") === "true"
  );
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
    setOpen(true);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Button to open the form on mobile view */}
      {!open && (
        <Button
          large
          onClick={openEmailLogin}
          className="lg:hidden" // Show only on mobile view
        >
          Login with Email
        </Button>
      )}

      {/* Form, hidden on mobile view by default and shown only when open */}
      <div className={`${open ? "block" : "hidden"} lg:block`}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <span className="text-center text-foreground">
            Login to your account
          </span>
          <TextInput
            autoFocus
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
        </form>
      </div>
    </div>
  );
};
