import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  time,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const playLevelEnum = pgEnum("playLevel", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const roleEnum = pgEnum("role", ["admin", "user"]);
export const weekdayEnum = pgEnum("weekday", [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  role: roleEnum("role").default("user").notNull(),
  member: boolean("member"),
  verified: boolean("verified").default(false).notNull(),
  remainingSessions: integer("remainingSessions").default(0).notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const gameSessions = pgTable("gameSession", {
  id: serial("id").primaryKey(),
  gameSessionScheduleId: integer("gameSessionScheduleId").references(
    () => gameSessionSchedules.id,
    { onDelete: "set null" },
  ),
  bookingOpen: timestamp("bookingOpen", { mode: "date" }).notNull(),
  bookingClose: timestamp("bookingClose", { mode: "date" }).notNull(),
  startTime: timestamp("startTime", { mode: "date" }).notNull(),
  endTime: timestamp("endTime", { mode: "date" }).notNull(),
  locationName: text("locationName").notNull(),
  locationAddress: text("locationAddress").notNull(),
  capacity: integer("capacity").notNull(),
  casualCapacity: integer("casualCapacity").notNull(),
});

export const bookings = pgTable("booking", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  gameSessionId: integer("gameSessionId")
    .notNull()
    .references(() => gameSessions.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  playLevel: playLevelEnum("playLevel").notNull(),
});

// each game session can have one gameSessionSchedule and many bookings
export const gameSessionRelations = relations(
  gameSessions,
  ({ one, many }) => ({
    gameSessionSchedules: one(gameSessionSchedules, {
      fields: [gameSessions.id],
      references: [gameSessionSchedules.id],
    }),
    bookings: many(bookings),
  }),
);

// each booking can have one game session
export const bookingSessionRelations = relations(bookings, ({ one }) => ({
  gameSession: one(gameSessions, {
    fields: [bookings.gameSessionId],
    references: [gameSessions.id],
  }),
  userSession: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
}));

export const userSessionRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const semesters = pgTable("semester", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  startDate: timestamp("startDate", { mode: "date" }).notNull(),
  endDate: timestamp("endDate", { mode: "date" }).notNull(),
  breakStart: timestamp("breakStart", { mode: "date" }).notNull(),
  breakEnd: timestamp("breakEnd", { mode: "date" }).notNull(),
  bookingOpenDay: weekdayEnum("bookingOpenDay").notNull(),
  bookingOpenTime: time("bookingOpenTime").notNull(),
});

export const gameSessionSchedules = pgTable(
  "gameSessionSchedule",
  {
    id: serial("id").primaryKey(),
    semesterId: integer("semesterId")
      .notNull()
      .references(() => semesters.id, { onDelete: "cascade" }),
    weekday: text("weekday").notNull(),
    startTime: time("startTime").notNull(),
    endTime: time("endTime").notNull(),
    locationName: text("locationName").notNull(),
    locationAddress: text("locationAddress").notNull(),
    capacity: integer("capacity").notNull(),
    casualCapacity: integer("casualCapacity").notNull(),
  },
  (gss) => ({
    unq: unique().on(gss.semesterId, gss.weekday),
  }),
);

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
