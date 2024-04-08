import React from "react";
import Image from "next/image";

import BreakLine from "./BreakLine";
import EmailLogin from "./EmailLogin";
import GoogleSignIn from "./GoogleSignIn";
import UabcHeaderText from "./UabcHeaderText";

const AuthLogin = () => {
  return (
    <div className="h-dvh w-dvw bg-[#0A172A] grid place-items-center">
      <div className="w-dvw px-4 flex-col h-full flex items-center justify-between py-8">
        <UabcHeaderText />
        <Image
          src="/svgs/logo2.svg"
          alt="uabc logo"
          width={225}
          height={225}
          draggable={false}
        />
        <div className="mt-6 flex flex-col w-full gap-4">
          <EmailLogin className="text-base" />
          <BreakLine label="or" />
          <GoogleSignIn className="w-full" />
          <p className="text-center text-white text-xs mt-2">
            Don&apos;t have an account?{" "}
            <a className="underline font-bold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
