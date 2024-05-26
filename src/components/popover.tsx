import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./ui/button";

type PopoverContextType = {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};

const PopoverContext = createContext<PopoverContextType>(
  {} as PopoverContextType,
);

export const Popover = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <PopoverContext.Provider value={{ open, handleOpen, handleClose }}>
      {children}
    </PopoverContext.Provider>
  );
};

export const PopoverContainer = ({ children }: { children: ReactNode }) => {
  const { open, handleClose } = useContext(PopoverContext);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  });

  return (
    <>
      <div
        className={cn(
          "h-dvh w-dvw fixed left-0 top-0 z-40",
          open ? "block" : "hidden",
        )}
        onClick={handleClose}
      />
      <div
        className={cn(
          "absolute w-56 bg-background p-1 flex flex-col z-50 top-4 right-6 rounded-md shadow-lg ring-1 ring-secondary",
          open ? "block" : "hidden",
        )}
      >
        {children}
      </div>
    </>
  );
};
export const PopoverOpenButton = ({ ...props }: ButtonProps) => {
  const { handleOpen } = useContext(PopoverContext);
  return (
    <Button onClick={handleOpen} {...props}>
      {props.children}
    </Button>
  );
};
