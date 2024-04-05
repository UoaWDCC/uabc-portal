import React from "react";

const BreakLine = ({ label }: { label: string }) => {
  return (
    <div className="mt-2 mb-4 flex whitespace-nowrap w-full justify-center items-center">
      <hr className="w-full border-tertiary" />
      <label className="m-2 w-min rounded-lg text-white text-sm">{label}</label>
      <hr className="w-full border-tertiary" />
    </div>
  );
};

export default BreakLine;
