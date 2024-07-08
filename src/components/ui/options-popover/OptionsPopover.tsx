import React, { useContext, type ReactNode } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Ellipsis } from "lucide-react";

import { Dialog } from "../dialog";
import { Popover, PopoverContext } from "../popover";

// * Wrapper component that add a button to trigger options popover
export const OptionsPopover = ({ children }: { children?: ReactNode }) => {
  return (
    <Popover>
      <Popover.Trigger variant="outline" className="z-10 h-6 w-8">
        <Ellipsis className="absolute w-4 stroke-tertiary" />
      </Popover.Trigger>
      <Popover.Menubar>{children}</Popover.Menubar>
    </Popover>
  );
};

export type DialogContextProps = {
  handleClose: () => void;
};

// * Button component is a button on the popover that will trigger dialog
// * Dialog component is the dialog that will be displayed when the popover is clicked
export const OptionDialogItem = ({
  DialogComponent,
  ButtonComponent,
}: {
  DialogComponent: ReactNode;
  ButtonComponent: ReactNode;
}) => {
  const { handleClose: closePopover } = useContext(PopoverContext);
  return (
    <Dialog onOpenChange={() => closePopover()}>
      <DialogTrigger asChild>{ButtonComponent}</DialogTrigger>
      {DialogComponent}
    </Dialog>
  );
};

OptionsPopover.DialogItem = OptionDialogItem;
