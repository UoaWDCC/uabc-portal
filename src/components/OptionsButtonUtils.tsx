import React, { forwardRef } from "react";
import { SquarePen, Trash2 } from "lucide-react";

import { Button } from "./ui/button";

type OptionTypes = { type: "edit" | "delete" };

// * Cosmetic button components for OptionsPopover
export const OptionButtonUtils = forwardRef<HTMLButtonElement, OptionTypes>(
  ({ type = "edit", ...props }: OptionTypes, ref) => {
    switch (type) {
      case "edit":
        return (
          <Button
            variant="ghost"
            className="hover:bg-secondary h-8 text-foreground justify-start w-full"
            ref={ref}
            {...props}
          >
            <SquarePen className="w-4 mr-2" />
            <p>Edit</p>
          </Button>
        );

      case "delete":
        return (
          <Button
            variant="ghost"
            className="hover:bg-destructive/20 h-8 text-destructive w-full justify-start"
            ref={ref}
            {...props}
          >
            <Trash2 className="w-4 mr-2" />
            <p>Delete</p>
          </Button>
        );
    }
  },
);

OptionButtonUtils.displayName = "OptionButtonUtils";
