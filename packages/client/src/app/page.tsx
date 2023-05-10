"use client";
import TextInput from "@/components/TextInput/TextInput";
import Button from "@/components/Button/Button";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [value, setValue] = useState("");
  return (
    <div>
      <p>Welcome to UABC Booking Portal.</p>
      <Link href="/login">
        <p>Go to Login</p>
      </Link>
    </div>
  );
}
