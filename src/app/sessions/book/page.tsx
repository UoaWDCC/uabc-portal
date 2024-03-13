"use client";

import { ExpandedSessionCard } from "@/components/booking/ExpandedSessionCard";
import { useState } from "react";

export default function BookSessionPage() {
  const [level, setLevel] = useState<string | undefined>(undefined);

  return (
    <div className="mx-5">
      <ExpandedSessionCard
        level={level}
        setLevel={setLevel}
        address={"99 Gillies Avenue, Epsom"}
        startTime={new Date(Date.now())}
        endTime={new Date(Date.now())}
        location={"Auckland Badminton Association"}
      />
    </div>
  );
}
