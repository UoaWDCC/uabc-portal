/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import TextInputProps from "./TextInputProps";
import { useState } from "react";

const TextInput = (props: TextInputProps) => {
  const [active, setActive] = useState(false);

  var border = active
    ? "ring-2 ring-blue-500 focus:ring-blue-500 border-none outline-none w-full rounded-md p-2"
    : "ring-2 ring-blue-400 focus:ring-blue-400 border-none outline-none w-full rounded-md p-2";

  var text =
    active || props.value != ""
      ? "absolute left-3 transition-all top-[-0.75rem] bg-white text-sm px-2  text-blue-500"
      : "absolute left-3 transition-all top-1.5 text-gray-500 cursor-text";

  if (props.isError) {
    border =
      "ring-2 ring-red-500 focus:ring-red-500 border-none outline-none w-full rounded-md p-2";
    text =
      "absolute left-3 transition-all top-[-0.75rem] bg-white text-sm px-2  text-red-500";
  }

  return (
    <div className="mx-8 my-4 relative">
      <label htmlFor="input" className={text}>
        {props.label}
      </label>

      <input
        type={props.type}
        defaultValue={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className={border}
        required
      />
    </div>
  );
};

export default TextInput;
