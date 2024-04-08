import React from "react";

import { UabcHeaderText } from "../UabcHeaderText";
import { UabcLogo } from "../UabcLogo";
import { BreakLine } from "./BreakLine";
import { EmailLogin } from "./EmailLogin";
import { GoogleSignIn } from "./GoogleSignIn";

export const AuthLogin = () => (
  <div className="dark min-h-dvh w-dvw bg-background px-4 flex-col flex items-center justify-between py-8">
    <UabcHeaderText />
    <UabcLogo />
    <div className="mt-6 flex flex-col w-full gap-4">
      <EmailLogin />
      <BreakLine label="or" />
      <GoogleSignIn className="w-full" />
      <p className="text-center text-tertiary dark:text-white text-xs mt-2">
        Don&apos;t have an account?{" "}
        <a className="underline font-bold">Sign up</a>
      </p>
    </div>
  </div>
);
