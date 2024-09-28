"use client";

import { AttendeesTable } from "@/components/admin/view-sessions/gameSessionId/AttendeesList";
import { NavigationBar } from "@/components/NavigationBar";
import { useGameSessionId } from "@/hooks/query/game-sessions";
import { formatFullDate } from "@/lib/utils/dates";

export default function ClientViewSessionsPageWithId({
  gameSessionId,
}: {
  gameSessionId: number;
}) {
  const { data, isLoading } = useGameSessionId(gameSessionId);
  const date = data?.date;
  return (
    <>
      <NavigationBar title="Attendees" pathName="/admin/view-sessions" />
      <div className="flex grow flex-col items-center">
        <div className="flex w-full flex-col gap-y-4 px-6 py-4 lg:mt-12 lg:w-4/5 lg:min-w-fit lg:px-12">
          <h1 className="text-2xl font-semibold">Attendees</h1>
          <p className="text-muted-foreground">
            Here&apos;s the attendee list for the session on{" "}
            <strong>{isLoading ? "Loading..." : formatFullDate(date!)}</strong>
          </p>
          <AttendeesTable gameSessionId={gameSessionId} />
        </div>
      </div>
    </>
  );
}
