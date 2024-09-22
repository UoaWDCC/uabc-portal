"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useForgotPasswordEmailMutation } from "@/hooks/mutations/forgot-password";
import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
});

export const EmailForgotPassword = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<boolean>(true);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useForgotPasswordEmailMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutate(data.email, {
      onSuccess: () => {
        setFormState(false);
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
    <>
      {formState == true ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <span className="text-center text-foreground">
              Forgot Password?
            </span>
            <TextInput
              autoFocus
              label="Email"
              type="email"
              isError={!!errors.email}
              errorMessage={errors.email?.message}
              {...register("email")}
            />
            <Button large type="submit" disabled={isPending}>
              Send Reset Link
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex w-full flex-col justify-center gap-4">
          <span className="text-center text-foreground">Forgot Password</span>
          <p className="px-4 text-sm">
            If the provided email address is registered on UABC, you will
            receive an email with further instructions on how to reset your
            password. In case you didn&apos;t receive this email, you need
            to create a new account{" "}
            <Link className="font-bold underline" href="/auth/sign-up">
              here
            </Link>
          </p>
          <Button large onClick={() => router.push("/auth/login?open=true")}>
            Back to Login
          </Button>
        </div>
      )}
    </>
  );
};
