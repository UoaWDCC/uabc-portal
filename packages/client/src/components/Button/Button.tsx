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
      className={`w-full h-14 rounded text-white font-semibold active:bg-[#264a7f]
        ${props.disabled ? "bg-[#BFBFBF] " : "bg-[#3767af]"} 
        ${props.widthFull ? "w-full" : "w-72"}`}
      onClick={props.onClick}
    >
      {props.label.toUpperCase()}
    </button>
  );
};

export default Button;
