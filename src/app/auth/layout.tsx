"use client";

import { UabcHeaderText } from "@/components/UabcHeaderText";
import { UabcLogo } from "@/components/UabcLogo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh w-dvw flex-col items-center justify-between bg-background px-4 py-8">
      <UabcHeaderText className="mb-4" />
      <UabcLogo />
      <div className="mt-8 flex w-full flex-col gap-4">{children}</div>
    </div>
  );
}
