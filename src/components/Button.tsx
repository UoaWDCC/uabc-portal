/**
 * @author Lia Arroyo <liayzabel@gmail.com>
 */

"use client";
import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  widthFull?: boolean;
  onClick?: () => void;
  children: string;
}

export const Button = ({
  widthFull,
  onClick,
  className,
  children,
  ...props
}: ButtonInputProps) => (
  <button
    type="button"
    className={cn(
      "h-14 min-w-72 whitespace-nowrap rounded bg-primary text-sm font-semibold uppercase text-primary-foreground transition-colors hover:bg-primary/90 active:brightness-75 disabled:pointer-events-none disabled:bg-neutral",
      widthFull && "w-full",
      className,
    )}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);
