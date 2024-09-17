"use client";

import { useAttendees } from "@/hooks/query/useAttendees";

export const AttendeesList = ({ gameSessionId }: { gameSessionId: number }) => {
  const { data, isLoading } = useAttendees(gameSessionId);
  return <>{isLoading ? "loading" : JSON.stringify(data)}</>;
};
