import React, { type ReactNode } from "react";
import { DialogClose, type DialogProps } from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "../button";
import {
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
    <DialogContent onCloseAutoFocus={onClose}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
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
