"use client";

import Image from "next/image";

import AuthLoginDesktop from "@/components/AuthLogin/AuthLoginDesktop";
import AuthLoginMobile from "@/components/AuthLogin/AuthLoginMobile";

export default function Login() {
  return (
    //TODO: add new uabc logo
    <AuthLoginMobile />
    // <AuthLoginDesktop />
  );
}
