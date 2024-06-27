import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";

import { PopoverContext } from "./popover";

type DialogCotnextProps = {
  handleClose: () => void;
};

export const DialogContext = createContext({} as DialogCotnextProps);

// * Button element is the popover item
// * Dialog element is the dialog that will be displayed when the popover is clicked
export const OptionDialogPopoverBase = ({
  DialogElement,
  ButtonElement,
}: {
  DialogElement: ReactNode;
  ButtonElement: ReactNode;
}) => {
  const { handleClose: closePopover } = useContext(PopoverContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <DialogContext.Provider value={{ handleClose }}>
      <Dialog
        onOpenChange={() => {
          closePopover();
          setOpen(!open);
        }}
        open={open}
      >
        <DialogTrigger asChild>{ButtonElement}</DialogTrigger>
        {DialogElement}
      </Dialog>
    </DialogContext.Provider>
  );
};
