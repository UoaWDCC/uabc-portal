import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TextInput } from "../TextInput";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

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
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(
      z.object({ email: emailSchema, password: passwordSchema })
    ),
  });

  const onSubmit = async (formData: SignUpFormData) => {
    setSuccess(false);
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
      toast({
        title: "Uh oh! Something went wrong",
        description:
          "An error occurred while creating your acccount. Please try again.",
        variant: "destructive",
      });
    } else {
      setSuccess(true);
    }

    setButtonDisabled(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <span className="text-center text-foreground">Create an Account</span>
        <TextInput
          className="text-foreground"
          label="Email"
          type="email"
          isError={!!errors.email}
          isSuccess={!(!!errors.email || !!errors.password) && success}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <TextInput
          label="Password"
          type="password"
          isError={!!errors.password}
          isSuccess={!(!!errors.email || !!errors.password) && success}
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
