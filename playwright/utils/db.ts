import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as relations from "@/lib/db/relations";
import * as schema from "@/lib/db/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

export const db = drizzle(postgres(process.env.DATABASE_URL), {
  schema: {
    ...schema,
    ...relations,
  },
});
