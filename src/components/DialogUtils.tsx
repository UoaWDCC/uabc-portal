import React, { type ReactNode } from "react";
import { DialogClose, type DialogProps } from "@radix-ui/react-dialog";

import { type InputProps } from "./TextInput";
import { Button, type ButtonProps } from "./ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface DialogCardProps extends DialogProps {
  title: string;
  children?: ReactNode;
  onClose?: () => void;
}

export const DialogCard = ({ title, children, onClose }: DialogCardProps) => {
  return (
    <DialogContent
      className="dark sm:max-w-[475px] max-w-[375px] rounded-lg"
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
    <DialogFooter className="flex gap-2 ">
      <DialogClose asChild>
        <Button variant="outline" className="text-foreground">
          Cancel
        </Button>
      </DialogClose>
      <Button {...props}>Confirm</Button>
    </DialogFooter>
  );
};

interface DialogInputFieldProps extends InputProps {
  errorMessage?: string;
}
