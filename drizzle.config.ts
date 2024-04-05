import { Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
