import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { z } from "zod";

import {
  sendBookingConfirmationEmail,
  sendNoMoreSessionsRemainingEmail,
} from "@/emails";
import { responses } from "@/lib/api/responses";
import { MEMBER_MAX_SESSIONS, NON_MEMBER_MAX_SESSIONS } from "@/lib/constants";
import { db } from "@/lib/db";
import {
  bookingDetails,
  bookingPeriods,
  bookings,
  gameSessions,
  users,
} from "@/lib/db/schema";
import { StatusError } from "@/lib/exceptions";
import { obfuscateId } from "@/lib/sqid";
import { nzstParse } from "@/lib/utils/dates";
import { userRouteWrapper } from "@/lib/wrappers";
import { userCache } from "@/services/user";
import type { User } from "@/types/next-auth";

/**
 * Creates a booking for the current user
 */

const bookingSchema = z.array(
  z.object({
    gameSessionId: z.number(),
    playLevel: z.union([
      z.literal("beginner"),
      z.literal("intermediate"),
      z.literal("advanced"),
    ]),
  })
);

export const POST = userRouteWrapper(
  async (request: NextRequest, _, currentUser: User) => {
    if (currentUser.member && !currentUser.verified) {
      return responses.forbidden();
    }

    // parse the input array of objects and check if the user has enough sessions
    const body = bookingSchema.parse(await request.json());
    const numOfSessions = body.length;

    if (numOfSessions === 0)
      return responses.badRequest({
        message: "Must book at least 1 session",
      });

    // find user
    const user = await db.query.users.findFirst({
      where: eq(users.id, currentUser.id),
    });
    if (!user)
      return responses.notFound({
        resourceType: "user",
        resourceId: currentUser.id,
      });

    const allowedBookingCount = user?.member
      ? MEMBER_MAX_SESSIONS
      : NON_MEMBER_MAX_SESSIONS;

    const [bookingsThisWeek] = await db
      .select({ count: count() })
      .from(bookings)
      .innerJoin(bookingDetails, eq(bookings.id, bookingDetails.bookingId))
      .innerJoin(
        bookingPeriods,
        and(
          gte(bookings.createdAt, bookingPeriods.bookingOpenTime),
          lte(bookings.createdAt, bookingPeriods.bookingCloseTime)
        )
      )
      .where(
        and(
          eq(bookings.userId, currentUser.id),
          lte(bookingPeriods.bookingOpenTime, new Date()),
          gte(bookingPeriods.bookingCloseTime, new Date())
        )
      );

    // const [bookingsThisWeek] = await db
    //   .select({ count: count() })
    //   .from(bookings)
    //   .innerJoin(bookingDetails, eq(bookings.id, bookingDetails.bookingId))
    //   .where(
    //     and(
    //       eq(bookings.userId, currentUser!.id),
    //       sql`date_trunc('week', ${bookings.createdAt}) = date_trunc('week', CURRENT_DATE)`
    //     )
    //   );

    // if user has already booked the maximum allowed sessions for this week
    if (bookingsThisWeek.count + numOfSessions > allowedBookingCount) {
      return responses.badRequest({
        message: "Maximum booking limit already reached for this week",
        code: "LIMIT_REACHED",
      });
    }

    // if the user is a member, check if they have enough prepaid sessions
    if (user?.member === true && user.prepaidSessions < numOfSessions) {
      return responses.badRequest({
        message: "Insufficient prepaid sessions remaining",
      });
    }

    // check if there are duplicate game session ids in the request
    if (numOfSessions == 2 && body[0].gameSessionId == body[1].gameSessionId) {
      return responses.badRequest({
        message: "Duplicate game session ids",
      });
    }

    for (const session of body) {
      // check if there is already a booking for the user in the game session
      const [existingBooking] = await db
        .select()
        .from(bookings)
        .innerJoin(bookingDetails, eq(bookings.id, bookingDetails.bookingId))
        .where(
          and(
            eq(bookings.userId, user.id),
            eq(bookingDetails.gameSessionId, session.gameSessionId)
          )
        );

      if (existingBooking) {
        return responses.badRequest({
          message: "You have already booked this game session.",
          code: "ALREADY_BOOKED",
        });
      }

      // check if gameSession exists

      const [result] = await db
        .select()
        .from(gameSessions)
        .innerJoin(
          bookingPeriods,
          eq(gameSessions.bookingPeriodId, bookingPeriods.id)
        )
        .where(and(eq(gameSessions.id, session.gameSessionId)));

      if (!result) {
        return responses.notFound({
          resourceType: "gameSession",
          resourceId: session.gameSessionId,
        });
      }

      const { gameSession, bookingPeriod } = result;

      // check if gameSesson is available for booking
      if (
        bookingPeriod.bookingOpenTime > new Date() ||
        bookingPeriod.bookingCloseTime < new Date() ||
        new Date() >
          nzstParse(gameSession.startTime, "HH:mm:ss", gameSession.date)
      )
        return responses.badRequest({
          message: "Game session is not currently available for booking",
        });
    }

    const bookingId = await db.transaction(async (tx) => {
      const [{ bookingId }] = await tx
        .insert(bookings)
        .values({
          userId: currentUser.id,
          isMember: user.member!,
        })
        .returning({ bookingId: bookings.id });

      for (const session of body) {
        const gameSession = await tx.query.gameSessions.findFirst({
          where: eq(gameSessions.id, session.gameSessionId),
        });

        await tx.execute(
          sql`SELECT * FROM ${gameSessions} WHERE ${gameSessions.id} = ${session.gameSessionId} FOR UPDATE;`
        );

        const { count } = await tx.execute(
          sql`INSERT INTO ${bookingDetails} ("bookingId", "gameSessionId", "playLevel")
              SELECT ${bookingId}, ${session.gameSessionId}, ${session.playLevel}
              WHERE 
              (CASE
                WHEN ${user.member} = TRUE THEN
                  (SELECT COUNT(*) 
                    FROM ${bookingDetails}
                    INNER JOIN ${bookings} ON ${bookingDetails.bookingId} = ${bookings.id}
                    WHERE ${bookingDetails.gameSessionId} = ${session.gameSessionId}
                    AND ${bookings.isMember} = TRUE) < ${gameSession?.memberCapacity}
              
                ELSE
                  (SELECT COUNT(*) 
                    FROM ${bookingDetails}
                    INNER JOIN ${bookings} ON ${bookingDetails.bookingId} = ${bookings.id}
                    WHERE ${bookingDetails.gameSessionId} = ${session.gameSessionId}
                    AND ${bookings.isMember} = FALSE) < ${gameSession?.casualCapacity}
              END)
              RETURNING *;
              `
        );

        if (count === 0) {
          throw new StatusError({
            status: 410,
            message: "Maximum capacity reached",
            code: "SESSION_FULL",
          });
        }
      }

      //decrement prepaid sessions if user is a member
      if (user?.member) {
        const [{ prepaidSessions }] = await tx
          .update(users)
          .set({
            prepaidSessions: user.prepaidSessions - numOfSessions,
          })
          .where(eq(users.id, currentUser.id))
          .returning({ prepaidSessions: users.prepaidSessions });

        if (prepaidSessions <= 0) {
          await tx
            .update(users)
            .set({ member: false, verified: false })
            .where(eq(users.id, currentUser.id));

          await sendNoMoreSessionsRemainingEmail(user);
        }

        userCache.revalidate(user.email);
      }

      return bookingId;
    });

    const obfuscatedBookingId = obfuscateId(bookingId);

    await sendBookingConfirmationEmail(currentUser, obfuscatedBookingId);

    return NextResponse.json({ id: obfuscatedBookingId }, { status: 201 });
  }
);
