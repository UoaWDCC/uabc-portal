"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";

type GoogleSignInProps = {
  className?: string;
};
export const GoogleSignIn = ({ className }: GoogleSignInProps) => {
  return (
    <button
      className={cn(
        "flex h-11 min-w-72 cursor-pointer select-none items-center justify-center gap-4 rounded border-2 border-tertiary bg-white font-semibold text-tertiary hover:opacity-90",
        className
      )}
      onClick={() => {
        signIn("google");
      }}
    >
      <Image
        src="/images/googleIcon.svg"
        width={20}
        height={20}
        alt="Google Icon"
      />
      <span>Continue with Google</span>
    </button>
  );
};
