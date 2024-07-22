import type { AdapterAccount } from "@auth/core/adapters";
import {
  boolean,
  date,
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
  prepaidSessions: integer("prepaidSessions").default(0).notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  pro: boolean("pro").default(false).notNull(),
  image: text("image"),
  password: text("password"),
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
  })
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
  })
);

export const gameSessions = pgTable("gameSession", {
  id: serial("id").primaryKey(),
  gameSessionScheduleId: integer("gameSessionScheduleId").references(
    () => gameSessionSchedules.id,
    { onDelete: "set null" }
  ),
  bookingPeriodId: integer("bookingPeriodId")
    .notNull()
    .references(() => bookingPeriods.id, { onDelete: "cascade" }),
  date: date("date").unique().notNull(),
  startTime: time("startTime").notNull(),
  endTime: time("endTime").notNull(),
  locationName: text("locationName").notNull(),
  locationAddress: text("locationAddress").notNull(),
  memberCapacity: integer("memberCapacity").notNull(),
  casualCapacity: integer("casualCapacity").notNull(),
});

export const bookingPeriods = pgTable("bookingPeriod", {
  id: serial("id").primaryKey(),
  semesterId: integer("semesterId")
    .notNull()
    .references(() => semesters.id, { onDelete: "cascade" }),
  bookingOpenTime: timestamp("bookingOpenTime", { mode: "date" })
    .notNull()
    .unique(),
  bookingCloseTime: timestamp("bookingCloseTime", { mode: "date" }).notNull(),
});

export const bookings = pgTable("booking", {
  id: serial("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  isMember: boolean("isMember").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const bookingDetails = pgTable(
  "bookingDetail",
  {
    bookingId: integer("bookingId")
      .notNull()
      .references(() => bookings.id, { onDelete: "cascade" }),
    gameSessionId: integer("gameSessionId")
      .notNull()
      .references(() => gameSessions.id, { onDelete: "cascade" }),
    playLevel: playLevelEnum("playLevel").notNull(),
  },
  (table) => ({
    compoundKey: primaryKey({
      columns: [table.bookingId, table.gameSessionId],
    }),
  })
);

export const semesters = pgTable("semester", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  startDate: date("startDate").notNull(),
  endDate: date("endDate").notNull(),
  breakStart: date("breakStart").notNull(),
  breakEnd: date("breakEnd").notNull(),
  bookingOpenDay: weekdayEnum("bookingOpenDay").notNull(),
  bookingOpenTime: time("bookingOpenTime").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
});

export const gameSessionSchedules = pgTable(
  "gameSessionSchedule",
  {
    id: serial("id").primaryKey(),
    semesterId: integer("semesterId")
      .notNull()
      .references(() => semesters.id, { onDelete: "cascade" }),
    weekday: weekdayEnum("weekday").notNull(),
    startTime: time("startTime").notNull(),
    endTime: time("endTime").notNull(),
    locationName: text("locationName").notNull(),
    locationAddress: text("locationAddress").notNull(),
    memberCapacity: integer("memberCapacity").notNull(),
    casualCapacity: integer("casualCapacity").notNull(),
  },
  (gss) => ({
    unq: unique().on(gss.semesterId, gss.weekday),
  })
);

export const gameSessionExceptions = pgTable("gameSessionException", {
  id: serial("id").primaryKey(),
  semesterId: integer("semesterId")
    .notNull()
    .references(() => semesters.id, { onDelete: "cascade" }),
  isDeleted: boolean("isDeleted").default(false).notNull(),
  date: date("date").unique().notNull(),
  startTime: time("startTime"),
  endTime: time("endTime"),
  locationName: text("locationName"),
  locationAddress: text("locationAddress"),
  memberCapacity: integer("memberCapacity"),
  casualCapacity: integer("casualCapacity"),
});
