import React, { ReactNode } from "react";

type PopoverProps = {
  children: ReactNode;
  handleClose: () => void;
};

// may need refactoring in the future, this just works for now
const PopoverContainer = ({ children, handleClose }: PopoverProps) => {
  return (
    <>
      {/* full screen div to close popover on click */}
      <div
        className="h-dvh w-dvw fixed left-0 top-0 z-40"
        onClick={handleClose}
      />
      <div className="absolute w-56 bg-background p-1 flex flex-col z-50 top-4 right-6 rounded-md shadow-lg ring-1 ring-secondary">
        {children}
      </div>
    </>
  );
};

export default PopoverContainer;
