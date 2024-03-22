"use client";

/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { useState } from "react";
import { twMerge } from "tailwind-merge";

type TextInputProps = {
  label?: string;
  value: string;
  type: string;
  isError: boolean;
  className?: string;
  onChange: (value: string) => void;
};

export const TextInput = (props: TextInputProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className="relative">
      <h2
        className={twMerge(
          "absolute left-3 transition-all ",
          active || props.value != ""
            ? "top-[-0.75rem] bg-white px-2 text-sm  text-blue-500"
            : "top-1.5 cursor-text text-gray-500",
          props.isError &&
            "absolute left-3 top-[-0.75rem] bg-white px-2 text-sm  text-red-500",
        )}
      >
        {props.label}
      </h2>

      <input
        type={props.type}
        defaultValue={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className={twMerge(
          "w-full rounded-md border-none p-2 outline-none ring-2",
          active
            ? "ring-blue-500 focus:ring-blue-500"
            : "ring-blue-400 focus:ring-blue-400",
          props.isError && "ring-red-500 focus:ring-red-500",
        )}
        required
      />
    </div>
  );
};
