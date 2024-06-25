"use client";

import { useState } from "react";

import { BreakLine } from "@/components/auth/BreakLine";
import { EmailLogin } from "@/components/auth/EmailLogin";
import { GoogleSignIn } from "@/components/auth/GoogleLoginButton";
import { UabcHeaderText } from "@/components/UabcHeaderText";
import { UabcLogo } from "@/components/UabcLogo";

export default function LoginPage() {
  const [emailLoginOpen, setEmailLoginOpen] = useState(false);
  return (
    <div className="min-h-dvh w-dvw bg-background px-4 flex-col flex items-center justify-between py-8">
      {emailLoginOpen ? <div /> : <UabcHeaderText className="mb-4" />}
      <UabcLogo />
      <div className="flex flex-col w-full gap-4 mt-8">
        <EmailLogin onLoginOpen={() => setEmailLoginOpen(true)} />
        <BreakLine label="or" />
        <GoogleSignIn className="w-full" />
        <p className="text-center text-tertiary dark:text-white text-xs mt-2">
          Don&apos;t have an account?{" "}
          <a className="underline font-bold">Sign up</a>
        </p>
      </div>
    </div>
  );
}
