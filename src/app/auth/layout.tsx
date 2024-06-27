"use client";

import { UabcHeaderText } from "@/components/UabcHeaderText";
import { UabcLogo } from "@/components/UabcLogo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh w-dvw bg-background px-4 flex-col flex items-center justify-between py-8">
      <UabcHeaderText className="mb-4" />
      <UabcLogo />
      <div className="flex flex-col w-full gap-4 mt-8">{children}</div>
    </div>
  );
}
