"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { Button, type ButtonProps } from "./ui/button";

interface BackButtonProps extends ButtonProps {
  pathName: string;
  className?: string;
  children?: ReactNode;
}

export const BackButton = ({
  pathName,
  className,
  children,
  ...props
}: BackButtonProps) => {
  const router = useRouter();
  const handleBackButtonClick = () => {
    router.replace(pathName);
  };
  return (
    <Button className={className} onClick={handleBackButtonClick} {...props}>
      {children}
    </Button>
  );
};
