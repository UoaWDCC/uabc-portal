"use client";

import type { PropsWithChildren } from "react";
import { signOut } from "next-auth/react";

import type { ButtonProps } from "./ui/button";
import { Button } from "./ui/button";

export const LogOutButton = ({
  children,
  size = "icon",
  variant = "ghost",
}: PropsWithChildren<ButtonProps>) => (
  <Button
    size={size}
    variant={variant}
    onClick={() =>
      signOut({
        callbackUrl: `/auth/login`,
      })
    }
  >
    {children}
  </Button>
);
