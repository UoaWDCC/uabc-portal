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
      className="w-72 h-14 bg-blue-600 rounded text-white font-semibold"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
