"use client";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isError, setError] = useState(false);

  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center">
        <Image
          src={"/UABC_logo.png"}
          className="pointer-events-none select-none "
          width={500}
          height={500}
          alt="UABC Logo"
          priority
        />

        <label className="p-8 text-center">
          {isError
            ? "Incorrect email or password. Please try again:"
            : "Please login:"}
        </label>
        <div className="flex flex-col gap-4 rounded-md">
          <TextInput
            label="Email"
            value={email}
            type="email"
            isError={isError}
            onChange={setEmail}
          />
          <TextInput
            label="Password"
            value={password}
            type="password"
            isError={isError}
            onChange={setPass}
          />

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
    </div>
  );
}
