import React, { type ReactNode } from "react";
import { DialogClose, type DialogProps } from "@radix-ui/react-dialog";

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
    <DialogContent
      className="sm:max-w-[475px] max-w-[375px] rounded-lg dark"
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
  primaryText?: string;
  secondaryText?: string;
}
export const DialogCardFooter = ({
  primaryText = "Confirm",
  secondaryText = "Cancel",
  ...props
}: DialogCardFooterProps) => {
  return (
    <DialogFooter className="flex gap-2 ">
      <DialogClose asChild>
        <Button variant="outline" className="text-foreground">
          {secondaryText}
        </Button>
      </DialogClose>
      <Button {...props}>{primaryText}</Button>
    </DialogFooter>
  );
};
