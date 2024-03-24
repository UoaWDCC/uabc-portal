/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  onClick?: () => void;
}

export const Card = ({
  onClick,
  className,
  children,
}: PropsWithChildren<CardProps>) => (
  <div onClick={onClick} className={cn("rounded-md", className)}>
    {children}
  </div>
);
