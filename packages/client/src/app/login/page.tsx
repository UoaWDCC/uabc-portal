"use client";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from "@/images/UABC_logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isError, setError] = useState(false);

  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center">
        <Image src={logo} alt="UABC Logo" priority />

        <label className="text-center p-8">
          {" "}
          {isError
            ? "Incorrect email or password. Please try again:"
            : "Please login:"}{" "}
        </label>
        <div className="w-319 h-852">
          <form noValidate>
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
            <Link href="/login">
              <Button
                label="Login"
                onClick={() =>
                  email && password ? setError(false) : setError(true)
                }
              />
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
