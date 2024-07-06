"use client";

import { type ReactNode } from "react";
import clsx from "clsx";
import { IoArrowBackOutline } from "react-icons/io5";

import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface NavigationBarProps {
  title: string;
  className?: string;
  children?: ReactNode;
}

export const NavigationBar = ({
  title,
  className,
  children,
}: NavigationBarProps) => {
  return (
    <div
      className={clsx(
        className,
        "mt-4 flex justify-between align-middle text-tertiary"
      )}
    >
      <div className="flex">
        <BackButton
          variant="ghost"
          className={cn("mr-4 grid size-8 place-items-center")}
          size="icon"
        >
          <IoArrowBackOutline size={24} />
        </BackButton>
        <span className={cn("self-center text-lg font-medium leading-none")}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
};
