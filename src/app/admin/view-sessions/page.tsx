"use client";

import React, { Suspense } from "react";

import { NavigationBar } from "@/components/NavigationBar";
import ClientViewSessionsPage from "./client-page";

export default function ViewSessionsPage() {
  return (
    <div className="mx-4 mt-0 flex min-h-dvh flex-col">
      <NavigationBar title="View Sessions"></NavigationBar>
      <Suspense>
        <ClientViewSessionsPage />
      </Suspense>
    </div>
  );
}
