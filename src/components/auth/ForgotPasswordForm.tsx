"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useForgotPasswordMutation } from "@/hooks/mutations/forgot-password";
import { Card } from "../Card";
import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
});

export const ForgotPasswordForm = () => {
  console.log("rerender");
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useForgotPasswordMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutate(data.email, {
      onSuccess: () => {
        setIsSubmitted(true);
      },
      onError: (e) => {
        if (e.message === "TOO_MANY_REQUESTS") {
          toast({
            title: "Too many requests",
            description:
              "You have made too many password reset requests. Please try again later.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong",
            description:
              "An error occurred while processing your request. Please try again.",
            variant: "destructive",
          });
        }
      },
    });
  };

  if (isSubmitted)
    return (
      <div className="flex w-full flex-col justify-center gap-4">
        <span className="text-center text-foreground">Forgot Password?</span>
        <Card variant="card" className="space-y-2 text-sm">
          <p>
            We&apos;ve emailed a password reset link to{" "}
            <strong>{getValues("email")}</strong>. Please check your inbox and
            follow the instructions to reset your password.
          </p>
          <p>
            If you did not receive an email, please sign up for an account{" "}
            <Link
              className="text-right font-bold underline"
              href="/auth/signup"
            >
              here
            </Link>
            .
          </p>
        </Card>
        <Button large onClick={() => router.push("/auth/login?open=true")}>
          Back to Login
        </Button>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <span className="text-center text-foreground">Forgot Password?</span>
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
  );
};
