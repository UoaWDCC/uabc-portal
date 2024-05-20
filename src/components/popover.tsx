import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { Button, type ButtonProps } from "./ui/button";

type PopoverContextType = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const PopoverContext = createContext<PopoverContextType>({});

export const Popover = ({ children }: { children: ReactNode }) => {
  const [open, isOpen] = useState(false);

  const handleOpen = () => isOpen(true);
  const handleClose = () => isOpen(false);

  return (
    <PopoverContext.Provider value={{ open, handleOpen, handleClose }}>
      {children}
    </PopoverContext.Provider>
  );
};

export const PopoverContainer = ({ children }: { children: ReactNode }) => {
  const { open, handleClose } = useContext(PopoverContext);
  if (!open) return;

  return (
    <>
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

export const PopoverOpenButton = ({ ...props }: ButtonProps) => {
  const { handleOpen } = useContext(PopoverContext);
  return (
    <Button
      variant="outline"
      className="w-8 h-6 z-10"
      onClick={handleOpen}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export const PopoverOpen = ({ children }: { children: ReactNode }) => {
  const { handleOpen } = useContext(PopoverContext);
  return (
    <div className="w-full h-full" onClick={handleOpen}>
      {children}
    </div>
  );
};

export const PopoverClose = ({ children }: { children: ReactNode }) => {
  const { handleClose } = useContext(PopoverContext);
  return (
    <div className="w-full h-full" onClick={handleClose}>
      {children}
    </div>
  );
};
