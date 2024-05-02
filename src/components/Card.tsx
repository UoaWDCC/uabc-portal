/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import type { PropsWithChildren } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary";
}

const cardVariants = cva("rounded-sm px-6 py-4", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
  },
  defaultVariants: {
    variant: "secondary",
  },
});

export const Card = ({
  className,
  variant,
  children,
}: PropsWithChildren<CardProps>) => (
  <div className={cn(cardVariants({ variant }), className)}>{children}</div>
);
