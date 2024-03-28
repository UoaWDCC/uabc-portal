"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import GoogleSignIn from "@/components/AuthLogin/GoogleSignIn";

export default function Login() {
  const [isError, setError] = useState(false);
  const { data } = useSession();
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    //TODO: redirect to sessions and add new uabc logo
    <div className="grid h-screen w-screen place-content-center bg-tertiary">
      <div className="flex select-none flex-col items-center rounded-[24px] bg-white p-12 px-20 drop-shadow-2xl">
        <p className="Proxima text-center text-[4rem] font-bold leading-[3rem] text-primary">
          UABC
        </p>
        <label className=" text-center text-sm">
          {isError
            ? "Incorrect email or password. Please try again:"
            : "Please login:"}
        </label>
        <GoogleSignIn className="mt-8" />
      </div>
    </div>
  );
}
