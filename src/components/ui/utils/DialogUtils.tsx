import React from "react";
import { DialogClose } from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "../button";
import { DialogFooter } from "../dialog";

interface DialogCardFooterProps extends ButtonProps {
  isPending?: boolean;
  primaryText?: string;
  secondaryText?: string;
}

// Footer component for confirmation or for form submission
// mainly used for api requests so isPending should be provided for ux

export const DialogButtonsFooter = ({
  isPending,
  primaryText = "Confirm",
  secondaryText = "Cancel",
  ...props
}: DialogCardFooterProps) => {
  return (
    <DialogFooter className="flex gap-2">
      <DialogClose asChild>
        <Button variant="outline">{secondaryText}</Button>
      </DialogClose>
      <Button
        {...props}
        className={cn(
          "transition-all duration-200",
          isPending && "pointer-events-none opacity-70"
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
