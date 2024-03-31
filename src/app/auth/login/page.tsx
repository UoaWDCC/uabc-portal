"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import GoogleSignIn from "@/components/AuthLogin/GoogleSignIn";

export default function Login() {
  const { data } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (data) {
      push("/sessions");
    }
  }, [data]);

  return (
    //TODO: add new uabc logo
    <div className="grid h-screen w-screen place-content-center from-primary to-white-[50%] bg-gradient-to-t">
      {/* card */}
      <div className="flex items-center rounded-2xl p-12 gap-20 drop-shadow-2xl">
        <Image
          src="/UABC_logo.png"
          width={219}
          height={213}
          alt="uabc logo"
          className="lg:block hidden"
        />
        <div className="flex select-none flex-col items-center">
          <div className="text-center">
            <p className="Proxima text-[4rem] font-bold leading-[2.5rem] text-primary">
              UABC
            </p>
            <label className="text-sms">Please login:</label>
          </div>
          <hr className="w-full my-6 mt-12 border-border" />

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
