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
        className="flex h-full max-h-[1000px] w-full flex-col justify-between border-0 bg-transparent py-8 sm:max-w-xl sm:border sm:bg-card"
      >
        <UabcHeaderText className="mb-4" />
        <UabcLogo className="flex justify-center" />
        <div className="flex w-full flex-col gap-4">{children}</div>
      </Card>
    </div>
  );
}
