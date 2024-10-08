"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useResetPasswordMutation } from "@/hooks/mutations/reset-password";
import { Card } from "../Card";
import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { passwordSchema } from "./formSchema";

const formSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useResetPasswordMutation(token);

  const onSubmit = async ({ newPassword }: z.infer<typeof formSchema>) => {
    mutate(newPassword, {
      onSuccess: () => {
        toast({
          title: "Success!",
          description: "Your password has been reset successfully.",
        });
        router.push("/auth/login");
      },
      onError: (e) => {
        const code = e.message;

        if (code === "TOO_MANY_REQUESTS") {
          toast({
            title: "Too many requests",
            description:
              "You have made too many requests. Please try again later.",
            variant: "destructive",
          });
        } else if (code === "INVALID_CODE") {
          toast({
            title: "Invalid or expired token",
            description:
              "The reset token is invalid or has expired. Please request a new password reset.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong",
            description: "An error occurred during the password reset process.",
            variant: "destructive",
          });
        }
      },
    });
  };

  return (
    <Card className="flex w-[415px] flex-col gap-4" variant="card">
      <div className="mb-2">
        <h1 className="pb-1 text-lg font-semibold tracking-tight text-foreground">
          Reset your password
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your new password below. Make sure it is strong and unique to
          keep your account secure.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <TextInput
            autoFocus
            label="New Password"
            type="password"
            isError={!!errors.newPassword}
            errorMessage={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            isError={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button disabled={isPending} type="submit">
            Reset Password
          </Button>
        </div>
      </form>
    </Card>
  );
}
