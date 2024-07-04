"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "./ui/button";

export const LogOutButton = () => (
  <Button size={"icon"} variant={"ghost"} onClick={() => signOut()}>
    <LogOut size={24} />
  </Button>
);
