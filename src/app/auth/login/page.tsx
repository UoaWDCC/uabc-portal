"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const [isError, setError] = useState(false);

  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
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
        <div
          className="mt-8 flex w-[300px] cursor-pointer justify-center gap-8 rounded-sm p-6 outline outline-1 hover:bg-gray-100"
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
