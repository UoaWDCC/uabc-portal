"use client";

import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  isError: boolean;
  classNames?: string;
}

const TextInputB = ({
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
        placeholder=" "
        className={twMerge(
          "peer w-full border-primary rounded p-2 border focus:border-2 outline-none h-full bg-background text-tertiary dark:text-white/70",
          isError && "border-red-500 ",
        )}
        {...props}
        required
      />
      <h2
        className={cn(
          "absolute -top-3 left-2 transition-all pointer-events-none select-none z-10 bg-background px-2 text-primary text-xs",
          "peer-focus:-top-3 peer-focus:translate-y-[0%] peer-focus:text-primary peer-focus:text-xs",
          "peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-[50%] peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-sm",
          isError && "text-red-500",
        )}
      >
        {label}
      </h2>
    </div>
  );
};

export default TextInputB;
