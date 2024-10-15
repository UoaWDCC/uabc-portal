import { drizzle } from "drizzle-orm/postgres-js";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as relations from "@/lib/db/relations";
import * as schema from "@/lib/db/schema";

declare global {
  // eslint-disable-next-line
  var db: PostgresJsDatabase<typeof schema & typeof relations> | undefined;
}

let db: PostgresJsDatabase<typeof schema & typeof relations>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(env.DATABASE_URL), {
    schema: {
      ...schema,
      ...relations,
    },
  });
} else {
  if (!global.db)
    global.db = drizzle(postgres(env.DATABASE_URL), {
      schema: {
        ...schema,
        ...relations,
      },
    });

  db = global.db;
}

export { db };
