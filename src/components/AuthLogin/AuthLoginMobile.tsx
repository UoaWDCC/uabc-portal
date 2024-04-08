import React from "react";
import Image from "next/image";

import BreakLine from "./BreakLine";
import EmailLogin from "./EmailLogin";
import GoogleSignIn from "./GoogleSignIn";
import UabcHeaderText from "./UabcHeaderText";

const AuthLoginMobile = () => {
  return (
    <div className="h-dvh w-dvw bg-[#0A172A] grid place-items-center">
      <div className="w-dvw px-4 flex-col h-full flex items-center justify-between py-8">
        <UabcHeaderText />
        <Image src="/svgs/logo2.svg" alt="uabc logo" width={225} height={225} />
        <div className="mt-6 flex flex-col w-full gap-4">
          <EmailLogin className="text-base" />
          <BreakLine label="or" />
          <GoogleSignIn className="w-full p-6 h-12 " />
          <p className="text-center text-white text-xs mt-6">
            Don&apos;t have an account?{" "}
            <span className="underline font-bold">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginMobile;
