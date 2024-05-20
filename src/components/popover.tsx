import React, { ReactNode } from "react";

type PopoverContainerProps = {
  children: ReactNode;
};

// may need refactoring in the future, this just works for now
export const Popover = ({ children }: PopoverContainerProps) => {
  return (
    <>
      <div className="h-dvh w-dvw fixed left-0 top-0 z-40" />
      <div className="absolute w-56 bg-background p-1 flex flex-col z-50 top-4 right-6 rounded-md shadow-lg ring-1 ring-secondary">
        {children}
      </div>
    </>
  );
};

export const PopoverTrigger = () => {
  return <></>;
};
