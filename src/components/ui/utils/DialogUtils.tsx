import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { DialogClose, type DialogProps } from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "../button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";

interface DialogCardProps extends DialogProps {
  title: string;
  children?: ReactNode;
  onClose?: () => void;
}

export const DialogCard = ({ title, children, onClose }: DialogCardProps) => {
  return (
    <DialogContent
      className="sm:max-w-[475px] max-w-[375px] rounded-lg"
      onCloseAutoFocus={onClose}
    >
      <DialogHeader>
        <DialogTitle className="text-foreground ">{title}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  );
};

interface DialogCardFooterProps extends ButtonProps {
  isPending?: boolean;
  primaryText?: string;
  secondaryText?: string;
}
export const DialogCardFooter = ({
  isPending,
  primaryText = "Confirm",
  secondaryText = "Cancel",
  ...props
}: DialogCardFooterProps) => {
  return (
    <DialogFooter className="flex gap-2">
      <DialogClose asChild>
        <Button variant="outline" className="text-foreground select-none">
          {secondaryText}
        </Button>
      </DialogClose>
      <Button
        {...props}
        className={cn(
          "transition-all duration-200 select-none",
          isPending && "pointer-events-none opacity-70",
        )}
      >
        {primaryText}
      </Button>
    </DialogFooter>
  );
};

export type DialogContextProps = {
  handleClose: () => void;
};

const DialogUtilsContext = createContext({} as DialogContextProps);

export const useDialogContext = () => {
  const context = useContext(DialogUtilsContext);
  if (!context) {
    throw new Error(
      "useDialogContext must be used within a DialogUtilsContextProvider",
    );
  }
  return context;
};

interface DialogBase extends DialogProps {
  children?: ReactNode;
  onOpenChange?: () => void;
}
export const DialogBase = ({
  children,
  onOpenChange = () => {},
  ...props
}: DialogBase) => {
  const [open, setOpen] = useState(props.defaultOpen || false);

  const handleClose = () => setOpen(false);

  return (
    <DialogUtilsContext.Provider value={{ handleClose }}>
      <Dialog
        onOpenChange={() => {
          setOpen(!open);
          onOpenChange();
        }}
        open={open}
        {...props}
      >
        {children}
      </Dialog>
    </DialogUtilsContext.Provider>
  );
};
