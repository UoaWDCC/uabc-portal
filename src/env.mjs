import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    ENVIRONMENT: z.string(),
  },
  client: {
    ENVIRONMENT: z.string(),
  },
  runtimeEnv: process.env,
});
