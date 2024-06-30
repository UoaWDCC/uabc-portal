import { relations } from "drizzle-orm";

import {
  bookingDetails,
  bookings,
  gameSessions,
  gameSessionSchedules,
  semesters,
  users,
} from "./schema";

// each game session can have one gameSessionSchedule and many bookings
export const gameSessionRelations = relations(
  gameSessions,
  ({ one, many }) => ({
    gameSessionSchedule: one(gameSessionSchedules, {
      fields: [gameSessions.gameSessionScheduleId],
      references: [gameSessionSchedules.id],
    }),
    bookingDetails: many(bookingDetails),
  }),
);

// each booking is made by one user
export const bookingRelations = relations(bookings, ({ one, many }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  bookingDetails: many(bookingDetails),
}));

// each booking detail is associated with one booking and one game session
export const bookingDetailRelations = relations(bookingDetails, ({ one }) => {
  return {
    booking: one(bookings, {
      fields: [bookingDetails.bookingId],
      references: [bookings.id],
    }),
    gameSession: one(gameSessions, {
      fields: [bookingDetails.gameSessionId],
      references: [gameSessions.id],
    }),
  };
});

export const userRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

// One semester is associated with many GameSessionSchedules
export const semesterRelations = relations(semesters, ({ many }) => ({
  gameSessionSchedules: many(gameSessionSchedules),
}));

// One GameSessionSchedule is associated with one Semester and many GameSessions
export const gameSessionScheduleRelations = relations(
  gameSessionSchedules,
  ({ one, many }) => ({
    semester: one(semesters, {
      fields: [gameSessionSchedules.semesterId],
      references: [semesters.id],
    }),
    gameSessions: many(gameSessions),
  }),
);
