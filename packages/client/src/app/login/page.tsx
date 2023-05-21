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

  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center">
        <Image src={logo} alt="University of Auckland Badminton Club Logo" />
        <label className="text-center p-8">Please login:</label>
        <div className="w-319 h-852">
          <TextInput
            label="Email"
            value={email}
            type="email"
            onChange={setEmail}
          />
          <TextInput
            label="Password"
            value={password}
            type="password"
            onChange={setPass}
          />
          <Link href="/login">
            <Button label="Login" onClick={() => console.log("Hello!")} />
          </Link>
        </div>
      </div>
    </div>
  );
}
