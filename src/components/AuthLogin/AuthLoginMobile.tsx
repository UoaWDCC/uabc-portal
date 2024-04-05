import React from "react";
import Image from "next/image";

import BreakLine from "./BreakLine";
import EmailLogin from "./EmailLogin";
import GoogleSignIn from "./GoogleSignIn";

const AuthLoginMobile = () => {
  return (
    <div className="h-[100dvh] w-[100dvw] bg-[#0A172A] grid place-items-center">
      <div className="w-[320px] flex-col h-full flex items-center justify-center">
        <Image src="/svgs/logo2.svg" alt="uabc logo" width={225} height={225} />
        <div className="mt-6 flex flex-col w-full">
          <p className="text-white text-center text-base">
            Login into your account
          </p>
          <EmailLogin className="mt-4 text-sm" />
          <p className="text-center text-white text-sm">
            Don&apos;t have an account?{" "}
            <span className="underline font-bold">Sign up</span>
          </p>
        </div>
        <BreakLine label="or" />
        <GoogleSignIn className="w-full p-6 h-12" />
      </div>
    </div>
  );
};

export default AuthLoginMobile;
