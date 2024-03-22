"use client";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { googleIcon48x } from "@image/index";

export default function Login() {
  const [isError, setError] = useState(false);

  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="grid h-screen w-screen place-content-center bg-tertiary">
      <div className="flex select-none flex-col items-center rounded-[24px] bg-white p-8 px-14 drop-shadow-2xl">
        <p className="Proxima text-center text-[4rem] font-bold leading-[3rem] text-primary">
          UABC
        </p>
        <label className=" text-center text-sm">
          {isError
            ? "Incorrect email or password. Please try again:"
            : "Please login:"}
        </label>
        <div
          className="mt-8 flex w-[300px] cursor-pointer justify-center gap-8 rounded-sm p-6 outline outline-1"
          onClick={() =>
            // email && password ? setError(false) : setError(true)
            signIn("google")
          }
        >
          <Image
            src="/images/googleIcon@48x.svg"
            width={24}
            height={24}
            alt="Google Icon"
          />
          <span>Sign in with Google</span>
        </div>
      </div>
    </div>
  );
}
