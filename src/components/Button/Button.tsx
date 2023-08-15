import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * @param label button text
 * @param onClick onClick event handler function
 * @returns styled html button component
 * @author Lia Arroyo <liayzabel@gmail.com>
 */
const Button = ({widthFull, onClick, disabled, label}: ButtonInputProps) => {
  return (
    //TODO: colours
    <button
      className={twMerge(
        "h-14 rounded text-white font-semibold text-sm bg-[#3767af] active:bg-[#264a7f] disabled:bg-[#BFBFBF] uppercase",
        widthFull ? "w-full" : "w-72",
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
