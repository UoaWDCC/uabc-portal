"use client";

import { useCallback, useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { OriginContext } from "./providers/OriginTracker";
import { Button } from "./ui/button";

interface BackNavigationBarProps {
  title: string;
  pathName: string;
  className?: string;
  children?: ReactNode;
}

export const BackNavigationBar = ({
  title,
  pathName,
  className,
  children,
  ...props
}: BackNavigationBarProps) => {
  const router = useRouter();
  const isWithinPage = useContext(OriginContext);

  const handleBackButtonClick = useCallback(() => {
    if (isWithinPage) router.back();
    else router.push(pathName);
  }, [isWithinPage, pathName, router]);

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
