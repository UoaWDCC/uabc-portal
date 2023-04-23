import React from "react";

const Button = ({ label, onClick }: ButtonInputProps) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
