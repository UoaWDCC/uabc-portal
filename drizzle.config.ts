import { Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/lib/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
