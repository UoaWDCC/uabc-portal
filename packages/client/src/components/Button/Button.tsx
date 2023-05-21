import React from "react";

/**
 * @param label button text
 * @param onClick onClick event handler function
 * @returns styled html button component
 * @author Lia Arroyo <liayzabel@gmail.com>
 */
const Button = ({ label, onClick }: ButtonInputProps) => {
  return (
    <button
      className="w-full p-4 bg-blue-500 rounded text-white font-semibold"
      onClick={onClick}
    >
      {label.toUpperCase()}
    </button>
  );
};

export default Button;
