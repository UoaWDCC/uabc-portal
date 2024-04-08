import React from "react";

const BreakLine = ({ label }: { label: string }) => {
  return (
    <div className="flex whitespace-nowrap w-full justify-center items-center">
      <hr className="w-full border-tertiary" />
      <span className="m-2 w-min rounded-lg text-white text-sm uppercase">
        {label}
      </span>
      <hr className="w-full border-tertiary" />
    </div>
  );
};

export default BreakLine;
