"use client";

import { useState } from "react";
import type { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { useForm } from "react-hook-form";

import {
  useRegisterMutation,
  useResendCodeMutation,
} from "@/hooks/mutations/registration";
import { TextInput } from "../TextInput";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface OTPFormAlertDialogProps extends AlertDialogProps {
  email: string;
  password: string;
  onSuccess: () => void;
}

export function OTPFormAlertDialog({
  email,
  password,
  onSuccess,
  ...props
}: OTPFormAlertDialogProps) {
  const { toast } = useToast();

  const { register, setFocus, handleSubmit } = useForm();

  const [verificationCode, setVerificationCode] = useState("");

  const { mutate: resendCode, isPending: isResendingCode } =
    useResendCodeMutation();

  const { mutate, isError: isRegisterError } = useRegisterMutation();

  const onSubmit = () => {
    mutate(
      { email, password, token: verificationCode },
      {
        onSuccess,
      }
    );
  };

  function handleResendCodeClick() {
    resendCode(email, {
      onSuccess: () => {
        toast({
          title: "Code Resent",
          description: `We've resent the verification code to ${email}.`,
        });
      },
      onError: (error) => {
        toast({
          title: "Failed to Resend Code",
          description:
            error instanceof Error ? error.message : "An error occurred",
          variant: "destructive",
        });
      },
    });
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter Verification Code</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the verification code we sent to <strong>{email}</strong>.
            This code will expire in 3 minutes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <TextInput
              autoFocus
              label="Verification Code"
              type="text"
              isError={isRegisterError}
              errorMessage={"Invalid code. Please double check and try again."}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={!verificationCode}>
            Next
          </Button>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleResendCodeClick}
            disabled={isResendingCode}
            className="p-0"
            variant="link"
          >
            Resend Code
          </Button>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
