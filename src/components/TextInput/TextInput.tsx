"use client"

/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { useState } from "react";
import TextInputProps from "./TextInputProps";
import { twMerge } from "tailwind-merge";

const TextInput = (props: TextInputProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className="mx-8 my-4 relative">
      <h2 className={twMerge("absolute left-3 transition-all ",
        active || props.value != ""
          ? "top-[-0.75rem] bg-white text-sm px-2  text-blue-500"
          : "top-1.5 text-gray-500 cursor-text",
        props.isError && "absolute left-3 top-[-0.75rem] bg-white text-sm px-2  text-red-500")}>
        {props.label}
      </h2>

      <input
        type={props.type}
        defaultValue={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className={twMerge("border-none outline-none w-full rounded-md p-2 ring-2",
          active
            ? "ring-blue-500 focus:ring-blue-500"
            : "ring-blue-400 focus:ring-blue-400",
          props.isError && "ring-red-500 focus:ring-red-500")}
        required
      />
    </div>
  );
};

export default TextInput;