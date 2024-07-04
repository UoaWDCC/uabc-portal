import React from "react";

export const BreakLine = ({ label }: { label: string }) => {
  return (
    <div className="flex w-full items-center justify-center whitespace-nowrap">
      <hr className="border-0.5 w-full border-tertiary dark:border-white" />
      <span className="mx-2 h-4 w-min rounded-lg text-xs uppercase text-tertiary dark:text-white">
        {label}
      </span>
      <hr className="border-0.5 w-full border-tertiary dark:border-white" />
    </div>
  );
};
