import React, { type ReactNode } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

import { Button, type ButtonProps } from "./ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export const DialogCard = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <DialogContent className="dark sm:max-w-[475px] max-w-[375px] rounded-lg">
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
