import React, { useContext, type ReactNode } from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

import { PopoverContext } from "./popover";

export const OptionItemPopoverBase = ({
  DialogElem,
  ButtonElem,
}: {
  DialogElem: ReactNode;
  ButtonElem: ReactNode;
}) => {
  const { handleClose } = useContext(PopoverContext);
  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger asChild>{ButtonElem}</DialogTrigger>
      {DialogElem}
    </Dialog>
  );
};
