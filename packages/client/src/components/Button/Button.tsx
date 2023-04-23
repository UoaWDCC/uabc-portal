import React from "react";

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
