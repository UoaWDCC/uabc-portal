import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ArrowRight } from "../Icons";

interface DashboardButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export function DashboardButton({
  children,
  href,
  className,
}: DashboardButtonProps) {
  return (
    <>
      <Link href={href}>
        <div
          className={cn(
            "relative flex h-20 items-center gap-4 rounded-sm bg-primary pl-6 pr-16 text-lg font-medium text-primary-foreground",
            className
          )}
        >
          {children}
          <ArrowRight className="absolute bottom-6 right-4 fill-primary-foreground" />
        </div>
      </Link>
    </>
  );
}
