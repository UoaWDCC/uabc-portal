import React from "react";
import Image from "next/image";

import EmailLogin from "./EmailLogin";
import GoogleSignIn from "./GoogleSignIn";

const AuthLoginMobile = () => {
  return (
    <div className="h-[100dvh] w-[100dvw] bg-[#0A172A] grid place-items-center">
      <div className="w-[375px] flex-col px-4 h-full flex items-center justify-center">
        <Image src="/svgs/logo2.svg" alt="uabc logo" width={250} height={250} />
        <div className="mt-10 flex flex-col w-full">
          <p className="text-white text-center text-sm">
            Login into your account
          </p>
          <EmailLogin className="mt-4 text-sm" />
        </div>
        <div className="mt-2 mb-4 flex whitespace-nowrap w-full justify-center items-center">
          <hr className="w-full border-tertiary" />
          <label className="m-2 w-min rounded-lg text-white">
            Please login
          </label>
          <hr className="w-full border-tertiary" />
        </div>
        <GoogleSignIn className="w-full p-6" />
      </div>
    </div>
  );
};

export default AuthLoginMobile;
