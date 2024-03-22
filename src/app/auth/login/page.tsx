"use client";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
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
    <div className="grid h-screen w-screen place-content-center">
      <div className="rounded-[24px] p-8 outline outline-1 outline-black">
        <p className="Proxima text-center text-5xl font-bold text-primary">
          UABC
        </p>
      </div>
      <label className="p-8 text-center">
        {isError
          ? "Incorrect email or password. Please try again:"
          : "Please login:"}
      </label>
      <div className="flex flex-col gap-4 rounded-md">
        <Button
          label="Login"
          className="rounded-[inherit] text-lg"
          onClick={() =>
            // email && password ? setError(false) : setError(true)
            signIn("google")
          }
        />
      </div>
    </div>
  );
}
