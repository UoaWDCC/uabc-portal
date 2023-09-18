"use client";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isError, setError] = useState(false);

  const { data } = useSession();

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center">
        <Image src={"/UABC_logo.png"} width={500} height={500} alt="UABC Logo" priority />

        <label className="text-center p-8">
          {" "}
          {isError
            ? "Incorrect email or password. Please try again:"
            : "Please login:"}{" "}
        </label>
        <div className="w-319 h-852">
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
