import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";

type GoogleSignInProps = {
  className?: string;
};
const GoogleSignIn = ({ className }: GoogleSignInProps) => {
  return (
    <>
      <div
        className={cn(
          "flex w-[300px] cursor-pointer justify-center gap-8 rounded items-center hover:contrast-75 bg-white",
          className,
        )}
        onClick={() => {
          signIn("google");
        }}
      >
        <Image
          src="/images/googleIcon.svg"
          width={24}
          height={24}
          alt="Google Icon"
        />
        <span>Sign in with Google</span>
      </div>
    </>
  );
};

export default GoogleSignIn;
