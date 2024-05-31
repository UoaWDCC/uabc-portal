// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { eq } from "drizzle-orm";
// import { z } from "zod";

// import { db } from "@/lib/db";
// import { bookingDetails, bookings, gameSessions, users } from "@/lib/db/schema";

// const routeContextSchema = z.object({
//   params: z.object({
//     gameSessionId: z.coerce.number(),
//   }),
// });

// export async function GET(
//   _req: NextRequest,
//   context: z.infer<typeof routeContextSchema>,
// ) {
//   try {
//     const result = routeContextSchema.safeParse(context);
//     if (!result.success)
//       return new Response("Invalid id provided in the request", {
//         status: 400,
//       });

//     const {
//       params: { gameSessionId },
//     } = result.data;

//     const session = await db.query.gameSessions.findFirst({
//       where: eq(gameSessions.id, gameSessionId),
//     });

//     if (!session)
//       return new Response(`No Game Session found with id: ${gameSessionId}`, {
//         status: 404,
//       });
//         const [players] = await db
//         .select({
//           firstName: users.firstName,
//           lastName: users.lastName,
//           email: users.email,
//           playLevel: bookingDetails.playLevel,
//           member: users.member,

//         })
//         .from(gameSessions)
//         .innerJoin(bookingDetails, eq(gameSessions.id, bookingDetails.gameSessionId))
//         .innerJoin(bookings, eq(bookingDetails.bookingId, bookings.id))
//         .rightJoin(users, eq(bookings.userId, users.id))
//         .where(eq(gameSessions.id, gameSessionId)).execute();

//     return NextResponse.json(players);
//   } catch {
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { bookingDetails, bookings, gameSessions, users } from "@/lib/db/schema";

const routeContextSchema = z.object({
  params: z.object({
    gameSessionId: z.coerce.number(),
  }),
});

export async function GET(
  _req: NextRequest,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    const result = routeContextSchema.safeParse(context);
    if (!result.success) {
      return new Response("Invalid id provided in the request", {
        status: 400,
      });
    }
    console.log("helloooooooooo");

    const {
      params: { gameSessionId },
    } = result.data;

    const session = await db.query.gameSessions.findFirst({
      where: eq(gameSessions.id, gameSessionId),
    });

    if (!session) {
      return new Response(`No Game Session found with id: ${gameSessionId}`, {
        status: 404,
      });
    }

    const players = await db
      .select({
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        playLevel: bookingDetails.playLevel,
        member: users.member,
      })
      .from(gameSessions)
      .innerJoin(
        bookingDetails,
        eq(gameSessions.id, bookingDetails.gameSessionId),
      )
      .innerJoin(bookings, eq(bookingDetails.bookingId, bookings.id))
      .innerJoin(users, eq(bookings.userId, users.id))
      .where(eq(gameSessions.id, gameSessionId))
      .execute();

    return NextResponse.json(players);
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
