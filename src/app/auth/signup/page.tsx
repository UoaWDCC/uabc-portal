"use client";

import { useState } from "react";
import Link from "next/link";

import { BreakLine } from "@/components/auth/BreakLine";
import { GoogleSignIn } from "@/components/auth/GoogleLoginButton";
import { EmailSignUp } from "@/components/auth/SignUp";

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full gap-4 mt-8">
      <EmailSignUp />
      <BreakLine label="or" />
      <GoogleSignIn className="w-full" />
      <p className="text-center text-tertiary dark:text-white text-xs mt-2">
        Already have an account?{" "}
        <Link
          className="font-bold hover:underline hover:cursor-pointer"
          href="/auth/login"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
