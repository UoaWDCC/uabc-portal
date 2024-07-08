import React from "react";
import Image from "next/image";
import clsx from "clsx";

import { cn } from "@/lib/utils";

interface SocialCardProps {
  className?: string;
  image: string;
  link: string;
  alt?: string;
  text: string;
}

const SocialCard = ({
  className,
  image = "",
  link = "/",
  alt = "",
  text,
}: SocialCardProps) => {
  return (
    <a className="w-full" href={link}>
      <div
        className={cn(
          "socialCardShadow pointer-events-none flex h-12 w-full select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-2xl border-2 border-border p-4 font-proxima font-bold",
          className
        )}
      >
        <Image width={24} height={24} src={image} alt={alt} />
        <p>{text}</p>
      </div>
    </a>
  );
};

export default SocialCard;
