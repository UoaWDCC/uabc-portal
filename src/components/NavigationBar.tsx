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
    <div className={clsx(className, "flex mt-4 align-middle text-tertiary")}>
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
  );
};
