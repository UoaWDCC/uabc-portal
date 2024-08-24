"use client";

import { Card } from "@/components/Card";
import { UabcHeaderText } from "@/components/UabcHeaderText";
import { UabcLogo } from "@/components/UabcLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh w-dvw place-items-center sm:p-8">
      <Card
        variant="card"
        className="flex h-full max-h-[1000px] w-full flex-col justify-between border-0 bg-transparent py-8 sm:max-w-xl sm:border sm:bg-card md:max-w-3xl md:gap-8 md:px-16 md:py-16 lg:max-w-5xl lg:flex-row lg:gap-8 lg:px-24 lg:py-48"
      >
        <div className="lg:w-1/3">
          <UabcHeaderText className="mb-4" />
          <UabcLogo className="flex justify-center" />
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-2/3">{children}</div>
      </Card>
    </div>
  );
}
