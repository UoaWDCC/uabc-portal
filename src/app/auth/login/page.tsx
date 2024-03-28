"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import GoogleSignIn from "@/components/AuthLogin/GoogleSignIn";

export default function Login() {
  const { data } = useSession();
  const { push } = useRouter();

  useEffect(() => {
    if (data) {
      // push("/sessions");
    }
  }, [data]);

  return (
    //TODO: redirect to sessions and add new uabc logo
    <div className="grid h-screen w-screen place-content-center bg-gradient-to-tr from-tertiary to-primary">
      {/* card */}
      <div className="flex select-none flex-col items-center rounded-2xl bg-white p-12 px-16 drop-shadow-2xl">
        <p className="Proxima text-center text-[4rem] font-bold leading-[3rem] text-primary">
          UABC
        </p>
        <label className=" text-center text-sm">Please login:</label>
        <GoogleSignIn className="mt-20" />
      </div>
    </div>
  );
}
