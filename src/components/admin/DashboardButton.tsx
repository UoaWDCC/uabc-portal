import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ArrowRight } from "../Icons";

interface DashboardButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function DashboardButton({
  children,
  href,
  className,
}: DashboardButtonProps) {
  return (
    <>
      <Link href={href}>
        <div
          className={cn(
            "relative h-20 bg-primary text-primary-foreground pl-6 pr-16 flex items-center text-lg font-medium rounded-sm gap-4",
            className,
          )}
        >
          {children}
          <ArrowRight className="absolute right-4 bottom-6 fill-primary-foreground" />
        </div>
      </Link>
    </>
  );
}
