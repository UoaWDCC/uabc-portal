import { notFound } from "next/navigation";
import { z } from "zod";

import { AttendeesTable } from "@/components/admin/view-sessions/gameSessionId/AttendeesList";
import { NavigationBar } from "@/components/NavigationBar";
import { getAttendeesFromId } from "@/services/game-sessions";

const routeContextSchema = z.object({
  params: z.object({
    gameSessionId: z.coerce.number(),
  }),
});

export default async function ViewSessionsPage(
  ctx: z.infer<typeof routeContextSchema>
) {
  const result = routeContextSchema.safeParse(ctx);

  if (!result.success) notFound();

  const gameSessionId = result.data.params.gameSessionId;
  const attendees = await getAttendeesFromId(gameSessionId);

  if (!attendees) notFound();

  return (
    <div className="mx-4 flex min-h-dvh flex-col">
      <NavigationBar title="Members" pathName="/admin" />
      <div className="flex grow flex-col items-center">
        <div className="flex w-full flex-col gap-y-4 px-6 py-4 lg:mt-12 lg:w-4/5 lg:min-w-fit lg:px-12">
          <h1 className="text-2xl font-semibold">Attendees</h1>
          <p className="text-muted-foreground">
            Here&apos;s the attendee list for the session on{" "}
            <strong>Tuesday 19th September.</strong>
          </p>
          <AttendeesTable gameSessionId={gameSessionId} />
        </div>
      </div>
    </div>
  );
}
