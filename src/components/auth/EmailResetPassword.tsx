"use client";

import React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useResetPasswordMutation } from "@/hooks/mutations/reset-password";
import { useResetPasswordEmail } from "@/hooks/query/resetPasswordEmail";
import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Card } from "../Card";
import { SkeletonEmailResetPassword } from "./SkeletonEmailResetPassword";

const formSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/\d/, { message: "Password must contain a number" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/\d/, { message: "Password must contain a number" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const EmailResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const { data, isLoading } = useResetPasswordEmail(
    searchParams.get("resetPasswordToken") ?? ""
  );

  const [formState, setFormState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useResetPasswordMutation(
    searchParams.get("resetPasswordToken") ?? ""
  );

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    mutate(formData.newPassword, {
      onSuccess: () => {
        setFormState(true)
      },
      onError: () => {
        toast({
          title: "Uh oh! Something went wrong",
          description:
            "An error occurred while creating your account. Please try again.",
          variant: "destructive",
        });
      },
    });
  };
  
  let form
  if (isLoading === true) {
    form = <SkeletonEmailResetPassword />
  } else {
    if (!!data?.email === true && formState === false) {
      form = <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <span className="text-center text-foreground">Reset Password</span>
          <TextInput
            autoFocus
            label="New Password"
            type="password"
            isError={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <TextInput
            autoFocus
            label="Confirm Password"
            type="Password"
            isError={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button large type="submit">
            Send Reset Link
          </Button>
        </div>
      </form>
    } else if (!!data?.email === true && formState === true) {
      form = <>
        <span className="text-center text-foreground">
          Password Reset Successful
        </span>
        <p className="text-center py-4 px-4 text-sm">Awesome. You have successfully reset the password for your account.</p>
        <Button className="py-4" large onClick={() => router.push("/auth/login")}>
          Log In
        </Button>
      </>
    } else {
      router.push("/auth/login")
    }
  } 

  return (
    <div className="my-4 flex grow flex-col items-center justify-center gap-y-6">
      <div className="w-full shadow-sm *:min-h-60 sm:w-1/2 sm:min-w-[400px] lg:w-1/3">
        <Card
          className={"relative flex flex-col gap-4 border"}
          variant="card"
        >
          {form}
        </Card>
      </div>
    </div>
  );
};