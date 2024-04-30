"use client";

import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  className?: string;
  isError?: boolean;
}

export const TextInput = ({
  label,
  type,
  isError,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={cn("relative h-11 ", className)}>
      <input
        type={type}
        placeholder={props.placeholder ? props.placeholder : " "}
        className={twMerge(
          "peer w-full border-primary rounded p-2 border focus:border-2 outline-none h-full bg-background dark:text-white/70",
          isError && "!border-destructive !text-destructive",
        )}
        {...props}
      />
      <span
        className={cn(
          "absolute top-0 -translate-y-[50%] left-2 transition-all pointer-events-none select-none z-10 bg-background px-1 text-primary text-xs autofill:bg-black",
          "peer-focus:top-0 peer-focus:-translate-y-[50%] peer-focus:text-primary peer-focus:text-xs peer-focus:px-1",
          "peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-[50%] peer-placeholder-shown:text-tertiary/70 peer-placeholder-shown:text-base peer-placeholder-shown:px-0",
          isError && "!text-destructive",
        )}
      >
        {label}
      </span>
    </div>
  );
};
