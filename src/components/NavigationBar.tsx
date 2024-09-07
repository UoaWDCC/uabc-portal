"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface NavigationBarProps {
  title: string;
  pathName: string;
  className?: string;
  children?: ReactNode;
}

export const NavigationBar = ({
  title,
  pathName,
  className,
  children,
  ...props
}: NavigationBarProps) => {
  const router = useRouter();
  const handleBackButtonClick = () => {
    router.replace(pathName);
  };

  return (
    <div
      className={cn(
        "mt-4 flex items-center justify-between text-tertiary",
        className
      )}
    >
      <div className="flex">
        <Button
          variant="ghost"
          className="mr-4 grid size-8 place-items-center"
          size="icon"
          onClick={handleBackButtonClick}
          {...props}
        >
          <IoArrowBackOutline size={24} />
        </Button>
        <span className="self-center text-lg font-medium leading-none">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
};
