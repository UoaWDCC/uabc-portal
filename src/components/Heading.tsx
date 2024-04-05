/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { cn } from "@/lib/utils";

interface HeadingProps {
  children: string;
  className?: string;
}

export const Heading = ({ children, className }: HeadingProps) => (
  <h1 className={cn("text-3xl font-bold tracking-tight", className)}>
    {children}
  </h1>
);
