"use client";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";

export default function BookSessionPage() {
  return (
    <div className="mx-5">
      <ExpandedSessionCard
        day="Monday"
        address={"99 Gillies Avenue, Epsom"}
        startTime={"5pm"}
        endTime={"7pm"}
        location={"Auckland Badminton Association"}
      />
    </div>
  );
}
