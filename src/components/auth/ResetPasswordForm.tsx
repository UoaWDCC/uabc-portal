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
import { SkeletonEmailResetPassword } from "./SkeletonEmailResetPassword";

const formSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
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

  const [formState, setFormState] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useResetPasswordMutation(token);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    mutate(formData.newPassword, {
      onSuccess: () => {
        setFormState(true);
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

  return (
    <div className="my-4 flex grow flex-col items-center justify-center gap-y-6">
      <div className="w-full shadow-sm *:min-h-60 sm:w-1/2 sm:min-w-[400px] lg:w-1/3">
        <Card className={"relative flex flex-col gap-4 border"} variant="card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <span className="text-center text-foreground">
                Reset Password
              </span>
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
        </Card>
      </div>
    </div>
  );
}
