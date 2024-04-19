/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

"use client";

import { twMerge } from "tailwind-merge";

import { cn } from "@/lib/utils";

type TextInputProps = {
  label?: string;
  value: string;
  type: string;
  isError: boolean;
  className?: string;
  onChange: (value: string) => void;
};

export const TextInput = (props: TextInputProps) => {
  return (
    <div className={cn("relative h-11 ", props.className)}>
      <h2
        className={twMerge(
          cn(
            "absolute left-3 transition-all pointer-events-none z-10 bg-background px-2",
          ),
          props.value != ""
            ? "top-[-0.75rem] text-sm text-blue-500"
            : "top-1.5 cursor-text text-tertiary/70 dark:text-white/70",
          props.isError && "left-3 top-[-0.75rem] px-2 text-sm text-red-500",
        )}
      >
        {props.label}
      </h2>
      <input
        type={props.type}
        defaultValue={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
        className={twMerge(
          cn(
            "w-full rounded p-2 border focus:border-2 outline-none h-full bg-background text-tertiary dark:text-white/70 InputAdjacentText",
            "border-blue-400 focus:border-blue-500",
          ),
          props.isError && "border-red-500 focus:border-red-500",
        )}
        required
      />
    </div>
  );
};
