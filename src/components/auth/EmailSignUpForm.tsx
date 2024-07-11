"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useValidateEmailMutation } from "@/hooks/mutations/registration";
import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import OTPFormAlertDialog from "./OTPFormAlertDialog";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/\d/, { message: "Password must contain a number" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" }),
});

export const EmailSignUpForm = () => {
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState<z.infer<typeof formSchema>>({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useValidateEmailMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    mutate(data.email, {
      onSuccess: () => {
        setDialogOpen(true);
        setFormData(data);
      },
      onError: (e) => {
        if (e.message === "400") {
          setError("email", {
            type: "manual",
            message: "Email already in use",
          });
        } else {
          toast({
            title: "Uh oh! Something went wrong",
            description:
              "An error occurred while creating your acccount. Please try again.",
            variant: "destructive",
          });
        }
      },
    });
  };

  const handleSuccessfulSignUp = () => {
    setDialogOpen(false);
    setSuccess(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <span className="text-center text-foreground">Create an Account</span>
          <TextInput
            label="Email"
            type="email"
            isError={!!errors.email}
            isSuccess={isValid && success}
            errorMessage={errors.email?.message}
            {...register("email")}
          />
          <TextInput
            label="Password"
            type="password"
            isError={!!errors.password}
            isSuccess={isValid && success}
            errorMessage={errors.password?.message}
            successMessage={"Account Created! Please log in now."}
            {...register("password")}
          />
          <Button large type="submit" disabled={isPending}>
            Sign Up with Email
          </Button>
        </div>
      </form>
      <OTPFormAlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleSuccessfulSignUp}
        email={formData.email}
        password={formData.password}
      />
    </>
  );
};
