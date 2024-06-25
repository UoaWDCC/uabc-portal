"use client";

import React from "react";

import { AdminViewSessionCard } from "@/components/admin/AdminViewSessionCard";
import { NavigationBar } from "@/components/NavigationBar";

export default function ViewSessionsPage() {
  return (
    <div className="min-h-dvh m-4">
      <NavigationBar title="View Sessions"></NavigationBar>
      <div className="flex flex-col items-center justify-center">
        <AdminViewSessionCard
          id="136"
          title="Thursday 21st March 2024"
          startTime="12:00PM"
          endTime="1:00PM"
          locationName="Location Name"
          locationAddress="Location Address"
          attendees={10}
          capacity={20}
          state="ongoing"
          className="w-full sm:w-1/2 lg:w-1/3"
        />
      </div>
    </div>
  );
}
