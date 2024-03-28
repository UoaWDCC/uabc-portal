import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { signIn } from "next-auth/react";

type ButtonProps = {
  className?: string;
};
const GoogleSignIn = ({ className }: ButtonProps) => {
  return (
    <>
      <div
        className={clsx(
          "flex w-[300px] cursor-pointer justify-center gap-8 rounded-sm p-6 outline outline-1 hover:bg-gray-100",
          `${className}`,
        )}
        onClick={() => {
          signIn("google");
        }}
      >
        <Image
          src="/images/googleIcon@48x.svg"
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
