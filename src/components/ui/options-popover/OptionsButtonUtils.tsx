import React, { forwardRef } from "react";
import { SquarePen, Trash2 } from "lucide-react";

import { Button } from "../button";

type OptionTypes = { type: "edit" | "delete" };

// * Cosmetic button components for OptionsPopover
export const OptionButtonUtils = forwardRef<HTMLButtonElement, OptionTypes>(
  ({ type = "edit", ...props }: OptionTypes, ref) => {
    switch (type) {
      case "edit":
        return (
          <Button
            variant="ghost"
            className="h-8 w-full justify-start text-foreground hover:bg-secondary"
            ref={ref}
            {...props}
          >
            <SquarePen className="mr-2 w-4" />
            <p>Edit</p>
          </Button>
        );

      case "delete":
        return (
          <Button
            variant="ghost"
            className="h-8 w-full justify-start text-destructive hover:bg-destructive/20"
            ref={ref}
            {...props}
          >
            <Trash2 className="mr-2 w-4" />
            <p>Delete</p>
          </Button>
        );
    }
  }
);

OptionButtonUtils.displayName = "OptionButtonUtils";
