import React, { useContext, type ReactNode } from "react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Ellipsis } from "lucide-react";

import { Popover, PopoverContext } from "../popover";
import { DialogBase } from "../utils/DialogUtils";

// * Wrapper component that add a button to trigger options popover
export const OptionsPopover = ({ children }: { children?: ReactNode }) => {
  return (
    <Popover>
      <Popover.Trigger variant="outline" className="w-8 h-6 z-10">
        <Ellipsis className="stroke-tertiary absolute w-4" />
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
    <DialogBase onOpenChange={() => closePopover()}>
      <DialogTrigger asChild>{ButtonComponent}</DialogTrigger>
      {DialogComponent}
    </DialogBase>
  );
};

OptionsPopover.DialogItem = OptionDialogItem;
