"use client";
import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  widthFull?: boolean;
  onClick?: () => void;
}

/**
 * @param label button text
 * @param onClick onClick event handler function
 * @returns styled html button component
 * @author Lia Arroyo <liayzabel@gmail.com>
 */
export const Button = ({
  label,
  widthFull,
  onClick,
  ...props
}: ButtonInputProps) => {
  return (
    <button
      type="button"
      className={cn(
        "h-14 min-w-72 rounded bg-[#3767af] text-sm font-semibold uppercase text-white active:bg-[#264a7f] disabled:bg-[#BFBFBF]",
        widthFull && "w-full",
      )}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
