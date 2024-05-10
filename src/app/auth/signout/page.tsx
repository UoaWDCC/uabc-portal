"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function SignOutPage() {
  return (
    <div className="h-dvh grid place-items-center">
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
