import React, { forwardRef, type ReactNode } from "react";
import { DialogClose, type DialogProps } from "@radix-ui/react-dialog";
import clsx from "clsx";

import { InputProps, TextInput } from "./TextInput";
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

export const DialogInputField = forwardRef<
  HTMLInputElement,
  DialogInputFieldProps
>(({ errorMessage, ...props }: DialogInputFieldProps, ref) => {
  return (
    <div className="flex-col">
      <TextInput
        {...props}
        isError={!!errorMessage}
        ref={ref}
        className={clsx("peer", props.className)}
      />
      <p className="h-1 text-xs text-destructive/80 peer-has-[input:focus]:!text-destructive transition-colors">
        {errorMessage}
      </p>
      {/* <p className="absolute left-2 bottom-1.5 h-2 text-xs text-destructive">
        {errorMessage}
      </p> */}
    </div>
  );
});

DialogInputField.displayName = "DialogInputField";
