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
      className="max-w-[375px] rounded-lg sm:max-w-[475px]"
      onCloseAutoFocus={onClose}
    >
      <DialogHeader>
        <DialogTitle className="text-foreground ">{title}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  );
};

export const DialogCardFooter = ({ ...props }: ButtonProps) => {
  return (
    <DialogFooter className="flex gap-2">
      <DialogClose asChild>
        <Button variant="outline" className="text-foreground">
          Cancel
        </Button>
      </DialogClose>
      <Button {...props}>Confirm</Button>
    </DialogFooter>
  );
};
