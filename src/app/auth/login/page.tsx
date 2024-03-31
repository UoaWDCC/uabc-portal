"use client";

import Image from "next/image";

import GoogleSignIn from "@/components/AuthLogin/GoogleSignIn";
import UabcHeaderText from "@/components/AuthLogin/UabcHeaderText";

export default function Login() {
  return (
    //TODO: add new uabc logo
    <div className="grid h-[100dvh] w-[100dvw] place-content-center from-primary to-white-[50%] bg-gradient-to-t">
      {/* card */}
      <div className="flex items-center rounded-2xl lg:p-12 gap-20 drop-shadow-2xl z-10">
        <Image
          src="/UABC_logo.png"
          width={219}
          height={213}
          alt="uabc logo"
          className="lg:block hidden"
        />
        <div className="flex select-none flex-col items-center">
          <UabcHeaderText />
          <div className="mt-12 mb-4 flex whitespace-nowrap w-full justify-center items-center">
            <hr className="w-full border-tertiary" />
            <label className="m-2 w-min rounded-lg text-base">
              Please login
            </label>
            <hr className="w-full border-tertiary" />
          </div>
          <GoogleSignIn />
        </div>
      </div>
      <div className="absolute bottom-0 justify-center flex overflow-hidden w-full max-h-[30%]">
        <Image
          className="min-w-[1920px] w-full"
          src="/svgs/loginPageWave.svg"
          width={1920}
          height={300}
          alt="decoration wave"
        />
      </div>
    </div>
  );
}
