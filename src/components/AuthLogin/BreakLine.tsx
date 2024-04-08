import React from "react";

const BreakLine = ({ label }: { label: string }) => {
  return (
    <div className="flex whitespace-nowrap w-full justify-center items-center">
      <hr className="w-full border-tertiary dark:border-white border-0.5" />
      <span className="mx-2 w-min h-4 rounded-lg text-tertiary dark:text-white text-xs uppercase">
        {label}
      </span>
      <hr className="w-full border-tertiary dark:border-white border-0.5" />
    </div>
  );
};

export default BreakLine;
