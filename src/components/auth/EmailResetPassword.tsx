"use client";

import { useEffect, useInsertionEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useResetPasswordMutation } from "@/hooks/mutations/reset-password";
import { useEmail } from "@/hooks/query/email";
import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

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
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" }),
});

export const EmailResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const { data, isLoading } = useEmail(
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
    mutate(formData, {
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
  if (isLoading == false) {
    if (data && formState == false) {
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
    } else if (data && formState == true) {
      form = <div className="flex w-full flex-col justify-center gap-4">
        <span className="text-center text-foreground">
          Password Reset Successful
        </span>
        <p className="px-4 text-sm">Awesome. You have successfully reset the password for your account.</p>
        <Button large onClick={() => router.push("/auth/log`in")}>
          Log In
        </Button>
      </div>
    } else {
      form = <div className="flex w-full flex-col justify-center gap-4">
        <span className="text-center text-foreground">
          Invalid Reset Link
        </span>
        <p className="px-4 text-sm">Password reset link is invalid.</p>
        <Button large onClick={() => router.push("/auth/forgot-password")}>
          Generate Reset Link
        </Button>
      </div>
    }
  } else {
    form = <div className="flex w-full flex-col justify-center gap-4">
      <span className="text-center text-foreground">
        Loading
      </span>
    </div>
  } 

  return (
    <>
      {form}
    </>
  );
};

export const ResetPassword = () => {

}