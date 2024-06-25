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

export const OptionDialogPopoverBase = ({
  DialogElem,
  ButtonElem,
}: {
  DialogElem: ReactNode;
  ButtonElem: ReactNode;
}) => {
  const { handleClose: closePopover } = useContext(PopoverContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogContext.Provider value={{ handleClose }}>
      <Dialog
        onOpenChange={() => {
          closePopover();
          setOpen(!open);
        }}
        open={open}
      >
        <DialogTrigger asChild>{ButtonElem}</DialogTrigger>
        {DialogElem}
      </Dialog>
    </DialogContext.Provider>
  );
};
