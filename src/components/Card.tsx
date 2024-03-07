/**
 * @author Angela Guo <aguo921@aucklanduni.ac.nz>
 */

import { PropsWithChildren } from "react";
import { twJoin } from "tailwind-merge";

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
    <div onClick={onClick} className={twJoin("rounded-md", className)}>
      {children}
    </div>
  );
};
