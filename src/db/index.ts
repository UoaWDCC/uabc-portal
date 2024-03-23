import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { env } from "@/env.mjs";
import * as schema from "@/db/schema";

declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (env.ENVIRONMENT === "PRODUCTION") {
  db = drizzle(postgres(env.DATABASE_URL), { schema });
} else {
  if (!global.db) global.db = drizzle(postgres(env.DATABASE_URL), { schema });

  db = global.db;
}

export { db };
