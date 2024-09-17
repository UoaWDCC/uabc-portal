import { notFound } from "next/navigation";
import { z } from "zod";

import { AttendeesList } from "@/components/admin/view-sessions/AttendeesList";
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
    <div className="grid size-full place-items-center">
      <AttendeesList gameSessionId={gameSessionId} />
    </div>
  );
}
