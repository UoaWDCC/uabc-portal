/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface CardProps {
  className?: string;
  onClick?: () => void;
}

export const Card = ({
  onClick,
  className,
  children,
}: PropsWithChildren<CardProps>) => {
  return (
    <div onClick={onClick} className={cn("rounded-md", className)}>
      {children}
    </div>
  );
};
