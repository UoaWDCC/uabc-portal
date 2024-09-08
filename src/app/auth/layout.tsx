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
        className="flex h-full w-full flex-col justify-between border-0 bg-transparent py-8 sm:max-h-[780px] sm:max-w-[440px] sm:border sm:bg-card lg:grid lg:max-h-[600px] lg:max-w-[900px] lg:grid-cols-2 lg:place-items-center"
      >
        <div className="relative hidden lg:block">
          <UabcHeaderText className="absolute -top-24 left-[50%] -translate-x-[50%]" />
          <UabcLogo className="flex justify-center" />
        </div>

        <UabcHeaderText className="mb-4 lg:hidden" />
        <UabcLogo className="flex justify-center lg:hidden" />

        <div className="flex w-full flex-col gap-4 lg:p-6">{children}</div>
      </Card>
    </div>
  );
}
