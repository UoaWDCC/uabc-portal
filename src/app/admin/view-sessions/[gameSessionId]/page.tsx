import { notFound } from "next/navigation";
import { z } from "zod";

import { getAttendeesFromId } from "@/services/game-sessions";
import ClientViewSessionsPageWithId from "./client-page";

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

  const gameSessionId = result!.data!.params.gameSessionId;
  const attendees = await getAttendeesFromId(gameSessionId);

  if (!attendees) notFound();

  return (
    <div className="mx-4 flex min-h-dvh flex-col">
      <ClientViewSessionsPageWithId gameSessionId={gameSessionId} />
    </div>
  );
}
