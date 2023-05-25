import React from "react";

/**
 * @param label button text
 * @param onClick onClick event handler function
 * @returns styled html button component
 * @author Lia Arroyo <liayzabel@gmail.com>
 */
const Button = (props: ButtonInputProps) => {
  // TODO: proper colours
  return (
    <button
      className={`h-14 rounded text-white font-semibold text-sm bg-[#3767af] active:bg-[#264a7f] disabled:bg-[#BFBFBF]
        ${props.widthFull ? "w-full" : "w-72"}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label.toUpperCase()}
    </button>
  );
};

export default Button;
