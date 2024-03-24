"use client";
import { TextInput } from "@/components/TextInput";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isError, setError] = useState(false);

  const { data } = useSession();

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
