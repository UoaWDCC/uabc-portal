"use client";

import { useAttendees } from "@/hooks/query/useAttendees";

export default function ViewSessionsPage({
  params: { gameSessionId },
}: {
  params: { gameSessionId: number };
}) {
  const attendees = useAttendees(gameSessionId);

  return <div>{JSON.stringify(attendees)}</div>;
}
