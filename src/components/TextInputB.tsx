import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isError: boolean;
}

const TextInputB = ({ label, ...props }: InputProps) => {
  return (
    <input
      className={twMerge(
        cn(
          "w-full rounded p-2 border focus:border-2 outline-none h-full bg-background text-tertiary dark:text-white/70 InputAdjacentText",
          "border-blue-primary",
        ),
        props.isError && "border-red-500 focus:border-red-500",
      )}
      {...props}
    />
  );
};

export default TextInputB;
