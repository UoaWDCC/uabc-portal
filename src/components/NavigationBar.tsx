"use client";

import { type ReactNode } from "react";
import { IoArrowBackOutline } from "react-icons/io5";

import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

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
}: NavigationBarProps) => {
  return (
    <div
      className={cn(
        "mt-4 flex items-center justify-between text-tertiary",
        className
      )}
    >
      <div className="flex">
        <BackButton
          variant="ghost"
          pathName={pathName}
          className="mr-4 grid size-8 place-items-center"
          size="icon"
        >
          <IoArrowBackOutline size={24} />
        </BackButton>
        <span className="self-center text-lg font-medium leading-none">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
};
