"use client";

import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface NavigationBarProps {
  title: string;
}

export const NavigationBar = ({ title }: NavigationBarProps) => {
  const router = useRouter();
  const handleBackButtonClick = () => {
    router.back();
  };
  return (
    <div className="flex mt-4 align-middle text-tertiary">
      <Button
        variant={"ghost"}
        className={cn("grid place-items-center mr-4 size-8")}
        size={"icon"}
        onClick={handleBackButtonClick}
      >
        <IoArrowBackOutline size={24} />
      </Button>
      <h1 className={cn("text-lg font-medium leading-none self-center")}>
        {title}
      </h1>
    </div>
  );
};
