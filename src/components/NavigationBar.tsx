"use client";

import clsx from "clsx";
import { IoArrowBackOutline } from "react-icons/io5";

import { BackButton } from "@/components/BackButton";
import { cn } from "@/lib/utils";

interface NavigationBarProps {
  title: string;
  className?: string;
}

export const NavigationBar = ({ title, className }: NavigationBarProps) => {
  return (
    <div
      className={clsx(
        className,
        "flex border-b p-4 align-middle text-tertiary",
      )}
    >
      <BackButton
        variant={"ghost"}
        className={cn("mr-4 grid size-8 place-items-center")}
        size={"icon"}
      >
        <IoArrowBackOutline size={24} />
      </BackButton>
      <span className={cn("self-center text-lg font-medium leading-none")}>
        {title}
      </span>
    </div>
  );
};
