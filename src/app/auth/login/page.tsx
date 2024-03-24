"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isError, setError] = useState(false);

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center">
        <Image
          src={"/UABC_logo.png"}
          width={500}
          height={500}
          alt="UABC Logo"
          priority
        />

        <label className="p-8 text-center">
          {" "}
          {isError
            ? "Incorrect email or password. Please try again:"
            : "Please login:"}{" "}
        </label>
        <div>
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
            onClick={() => {
              signIn("google");
            }}
          >
            login
          </Button>
        </div>
      </div>
    </div>
  );
}
