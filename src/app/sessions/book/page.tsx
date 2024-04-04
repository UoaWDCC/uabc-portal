"use client";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";

enum weekday {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}
export default function BookSessionPage() {
  return (
    <div className="mx-5">
      <ExpandedSessionCard
        day={weekday.Monday}
        address={"99 Gillies Avenue, Epsom"}
        startTime={new Date(Date.now())}
        endTime={new Date(Date.now())}
        location={"Auckland Badminton Association"}
      />
    </div>
  );
}
