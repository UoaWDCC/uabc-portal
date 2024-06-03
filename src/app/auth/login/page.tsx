"use client";

import { useState } from "react";

import { BreakLine } from "@/components/auth/BreakLine";
import { EmailLogin } from "@/components/auth/EmailLogin";
import { GoogleSignIn } from "@/components/auth/GoogleLoginButton";
import { SignUp } from "@/components/auth/SignUp";
import { UabcHeaderText } from "@/components/UabcHeaderText";
import { UabcLogo } from "@/components/UabcLogo";

export default function LoginPage() {
  const [SignInOpen, setSignInOpen] = useState(false);
  const [emailLoginOpen, setEmailLoginOpen] = useState(true);
  return (
    <div className="min-h-dvh w-dvw bg-background px-4 flex-col flex items-center justify-between py-8">
      {SignInOpen ? <div /> : <UabcHeaderText className="mb-4" />}
      <UabcLogo />
      <div className="flex flex-col w-full gap-4 mt-8">
        {emailLoginOpen ? (
          <EmailLogin
            onLoginOpen={() => setSignInOpen(true)}
            loginOpen={SignInOpen}
          />
        ) : (
          <SignUp />
        )}
        <BreakLine label="or" />
        <GoogleSignIn className="w-full" />
        {emailLoginOpen ? (
          <p className="text-center text-tertiary dark:text-white text-xs mt-2">
            Don&apos;t have an account?{" "}
            <a
              className="font-bold hover:underline hover:cursor-pointer"
              onClick={() => {
                setSignInOpen(true);
                setEmailLoginOpen(false);
              }}
            >
              Sign up
            </a>
          </p>
        ) : (
          <p className="text-center text-tertiary dark:text-white text-xs mt-2">
            Already have an account?{" "}
            <a
              className="font-bold hover:underline hover:cursor-pointer"
              onClick={() => {
                setSignInOpen(true);
                setEmailLoginOpen(true);
              }}
            >
              Log in
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
