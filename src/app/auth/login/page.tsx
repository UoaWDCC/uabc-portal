"use client";

import { useState } from "react";
import Link from "next/link";

import { BreakLine } from "@/components/auth/BreakLine";
import { EmailLogin } from "@/components/auth/EmailLogin";
import { GoogleSignIn } from "@/components/auth/GoogleLoginButton";

export default function LoginPage() {
  const [signInOpen, setSignInOpen] = useState(false);
  return (
    <div className="flex flex-col w-full gap-4 mt-8">
      <EmailLogin
        onLoginOpen={() => setSignInOpen(true)}
        loginOpen={signInOpen}
      />
      <BreakLine label="or" />
      <GoogleSignIn className="w-full" />
      <p className="text-center text-tertiary dark:text-white text-xs mt-2">
        Don&apos;t have an account?{" "}
        <Link
          className="font-bold hover:underline hover:cursor-pointer"
          href="/auth/signup"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
