/**
 * @author Lia Arroyo <liayzabel@gmail.com>
 */

"use client";

import type { ButtonHTMLAttributes } from "react";
import React from "react";

import { cn } from "@/lib/utils";

interface ButtonInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children: string;
}

export const Button = ({
  onClick,
  className,
  children,
  ...props
}: ButtonInputProps) => (
  <button
    className={cn(
      "h-11 min-w-72 select-none whitespace-nowrap rounded bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/90 active:brightness-75 disabled:pointer-events-none disabled:opacity-40",
      className,
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);
