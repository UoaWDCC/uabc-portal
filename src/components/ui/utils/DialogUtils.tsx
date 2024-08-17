import React from "react";
import { DialogClose } from "@radix-ui/react-dialog";

import { Button, type ButtonProps } from "../button";
import { DialogFooter } from "../dialog";

interface DialogCardFooterProps extends ButtonProps {
  primaryText?: string;
  secondaryText?: string;
  onCancel?: () => void;
}

// Footer component for confirmation or for form submission
// mainly used for api requests so isPending should be provided for ux

export const DialogButtonsFooter = ({
  primaryText = "Confirm",
  secondaryText = "Cancel",
  onCancel,
  ...props
}: DialogCardFooterProps) => {
  return (
    <DialogFooter className="flex gap-2">
      <DialogClose asChild>
        <Button variant="outline" onClick={onCancel}>
          {secondaryText}
        </Button>
      </DialogClose>
      <Button {...props}>{primaryText}</Button>
    </DialogFooter>
  );
};

export type DialogContextProps = {
  handleClose: () => void;
};
