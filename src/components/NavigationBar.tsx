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
        "flex justify-between mt-4 align-middle text-tertiary",
      )}
    >
      <div className="flex">
        <BackButton
          variant={"ghost"}
          className={cn("grid place-items-center mr-4 size-8")}
          size={"icon"}
        >
          <IoArrowBackOutline size={24} />
        </BackButton>
        <span className={cn("text-lg font-medium leading-none self-center")}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
};
