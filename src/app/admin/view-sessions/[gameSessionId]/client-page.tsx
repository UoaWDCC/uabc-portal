"use client";

import { AttendeesTable } from "@/components/admin/view-sessions/gameSessionId/AttendeesList";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useGameSessionId } from "@/hooks/query/game-sessions";
import { formatFullDate } from "@/lib/utils/dates";

export default function ClientViewSessionsPageWithId({
  gameSessionId,
}: {
  gameSessionId: number;
}) {
  const { data, isLoading } = useGameSessionId(gameSessionId);
  const date = data?.date;

  async function downloadAttendeesList() {
    const res = await fetch(`/api/game-sessions/${gameSessionId}/download`);
    if (!res.ok) {
      throw new Error("Failed to download attendees list");
    }
    const fileContents = await res.blob();
    const a = document.createElement("a");
    const url = URL.createObjectURL(fileContents);
    a.href = url;
    a.download = `${formatFullDate(date!)} attendees list.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDownloadcsv() {
    try {
      await downloadAttendeesList();
    } catch {
      toast({ variant: "destructive", title: "Uh oh! Something went wrong." });
    }
  }

  return (
    <>
      <NavigationBar
        title={isLoading ? "Loading..." : formatFullDate(date!)}
        pathName="/admin/view-sessions"
      />
      <div className="flex grow flex-col items-center">
        <div className="flex w-full flex-col gap-y-4 px-6 py-4 lg:mt-12 lg:w-4/5 lg:min-w-fit lg:px-12">
          <h1 className="flex justify-between text-2xl font-semibold">
            <p>Attendees</p>
            <Button className="font-semibold" onClick={handleDownloadcsv}>
              Download attendees list
            </Button>
          </h1>
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
