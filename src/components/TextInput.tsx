"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type: string;
  className?: string;
  isError?: boolean;
  errorMessage?: string;
  isSuccess?: boolean;
  successMessage?: string;
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type,
      isError,
      className,
      errorMessage,
      isSuccess,
      successMessage,
      ...props
    }: InputProps,
    ref,
  ) => {
    return (
      <div className={cn("flex w-full flex-col text-left", className)}>
        <div className="peer relative h-11">
          <input
            type={type}
            placeholder={props.placeholder ? props.placeholder : " "}
            className={twMerge(
              "peer h-full w-full rounded border border-primary bg-background p-2 outline-none ring-inset ring-primary focus:ring-1 dark:text-white/70",
              (isError && "border-destructive ring-destructive") ||
                (isSuccess && "border-green-600 ring-green-600"),
            )}
            {...props}
            ref={ref}
          />
          <span
            className={cn(
              "pointer-events-none absolute left-2 top-0 z-10 -translate-y-[50%] select-none whitespace-nowrap bg-background px-1 text-xs text-primary transition-all",
              "peer-focus:top-0 peer-focus:bg-background peer-focus:px-1 peer-focus:text-xs peer-focus:text-primary",
              "peer-placeholder-shown:top-[50%] peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-tertiary/70",
              (isError &&
                "!text-destructive/70 peer-focus:!text-destructive") ||
                (isSuccess && "!text-green-600/70 peer-focus:!text-green-600"),
            )}
          >
            {label}
          </span>
        </div>
        {/* has 3 lines(40px) of error message height */}
        {(isError || isSuccess) && (
          <p
            className={twMerge(
              "max-h-0 w-full text-xs transition-[max-height] duration-150 ease-in-out",
              ((!!errorMessage && isError) ||
                (!!successMessage && isSuccess)) &&
                "max-h-10",
              isError &&
                "peer-has[input:focus]:!text-destructive text-destructive/80",
              isSuccess &&
                "peer-has[input:focus]:!text-green-600 text-green-600/80",
            )}
          >
            {isError && errorMessage}&nbsp;
            {isSuccess && successMessage}&nbsp;
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
