"use client";

import Link from "next/link";

import { BreakLine } from "@/components/auth/BreakLine";
import { GoogleSignIn } from "@/components/auth/GoogleLoginButton";
import { EmailSignUp } from "@/components/auth/SignUp";

export default function LoginPage() {
  return (
    <div className="mt-8 flex w-full flex-col gap-4">
      <EmailSignUp />
      <BreakLine label="or" />
      <GoogleSignIn className="w-full" />
      <p className="mt-2 text-center text-xs text-tertiary dark:text-white">
        Already have an account?{" "}
        <Link
          className="font-bold hover:cursor-pointer hover:underline"
          href="/auth/login"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
