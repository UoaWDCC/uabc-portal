import type { AdapterAccount } from "@auth/core/adapters";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const playLevelEnum = pgEnum("playLevel", [
  "beginner",
  "intermediate",
  "advanced",
]);
export const roleEnum = pgEnum("role", ["admin", "user"]);

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  firstName: text("firstName"),
  lastName: text("lastName"),
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
  bookingClose: timestamp("bookingClose", { mode: "date" }).notNull(),
  bookingOpen: timestamp("bookingOpen", { mode: "date" }).notNull(),
  startTime: timestamp("startTime", { mode: "date" }).notNull(),
  endTime: timestamp("endTime", { mode: "date" }).notNull(),
  locationName: text("locationName").notNull(),
  locationAddress: text("locationAddress").notNull(),
  maxUsers: integer("maxUsers").notNull(),
});
