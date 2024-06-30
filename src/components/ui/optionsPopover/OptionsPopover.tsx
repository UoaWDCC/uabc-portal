import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Ellipsis } from "lucide-react";

import { Popover, PopoverContext } from "../popover";

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

export const OptionsDialogContext = createContext({} as DialogContextProps);

export const useOptionsDialogContext = () => {
  const context = useContext(OptionsDialogContext);
  if (!context) {
    throw new Error(
      "useOptionsDialogContext must be used within a OptionsDialogContextProvider",
    );
  }
  return context;
};

// * Button element is the popover item
// * Dialog element is the dialog that will be displayed when the popover is clicked
export const OptionDialogItem = ({
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
    <OptionsDialogContext.Provider value={{ handleClose }}>
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
    </OptionsDialogContext.Provider>
  );
};

OptionsPopover.DialogItem = OptionDialogItem;
