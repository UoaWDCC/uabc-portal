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
        "flex min-w-72 select-none cursor-pointer justify-center gap-4 rounded items-center hover:opacity-90 bg-white h-11 font-semibold border-2 border-tertiary text-tertiary",
        className,
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
