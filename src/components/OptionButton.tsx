import React, { type ReactNode } from "react";
import { Ellipsis } from "lucide-react";

import { Popover, PopoverContainer, PopoverOpenButton } from "./popover";

// Wrapper component that add a button to trigger options popover
const OptionsPopoverButton = ({ children }: { children?: ReactNode }) => {
  return (
    <Popover>
      <PopoverOpenButton variant="outline" className="w-8 h-6 z-10">
        <Ellipsis className="stroke-tertiary absolute w-4" />
      </PopoverOpenButton>
      <PopoverContainer>{children}</PopoverContainer>
    </Popover>
  );
};

export default OptionsPopoverButton;
