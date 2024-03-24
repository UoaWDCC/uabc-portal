import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env.mjs";

declare global {
  // eslint-disable-next-line
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
