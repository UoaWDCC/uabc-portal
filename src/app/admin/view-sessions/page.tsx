"use client";

import React from "react";

import { NavigationBar } from "@/components/NavigationBar";
import ClientViewSessionsPage from "./client-page";

export default function ViewSessionsPage() {
  return (
    <div className="min-h-dvh mx-4 mt-0 flex flex-col">
      <NavigationBar title="View Sessions"></NavigationBar>
      <ClientViewSessionsPage />
    </div>
  );
}
