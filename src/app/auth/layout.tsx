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
        className="sm:max-h[780px] md:max-h[780px] lg:max-h[600px] flex h-full w-full flex-col justify-center border-0 bg-transparent py-8 sm:max-w-[440px] sm:border sm:bg-card md:max-w-[440px] md:gap-8 md:px-16 md:py-16 lg:max-w-[900px] lg:flex-row lg:gap-8 lg:px-24 lg:py-24"
      >
        <div className="lg:flex lg:w-1/2 lg:flex-col lg:justify-center">
          <UabcHeaderText className="mb-4" />
          <UabcLogo className="flex justify-center" />
        </div>

        <div className="flex flex-col gap-4 lg:w-1/2 lg:justify-center">
          {children}
        </div>
      </Card>
    </div>
  );
}
