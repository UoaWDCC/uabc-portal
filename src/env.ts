import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().url().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    ENVIRONMENT: z.union([z.literal("DEVELOPMENT"), z.literal("PRODUCTION")]),
    SES_ACCESS_KEY: z.string().min(1),
    SES_SECRET_ACCESS_KEY: z.string().min(1),
    MAIL_FROM: z.string().email().min(1),
    REPLY_TO: z.string().email().min(1),
    AWS_REGION: z.string().min(1),
    APP_URL: z.string().url().min(1),
    SQID_SECRET: z.string().min(3),
    CRON_SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ENVIRONMENT: process.env.ENVIRONMENT,
    SES_ACCESS_KEY: process.env.SES_ACCESS_KEY,
    SES_SECRET_ACCESS_KEY: process.env.SES_SECRET_ACCESS_KEY,
    MAIL_FROM: process.env.MAIL_FROM,
    REPLY_TO: process.env.REPLY_TO,
    AWS_REGION: process.env.AWS_REGION,
    APP_URL: process.env.APP_URL,
    SQID_SECRET: process.env.SQID_SECRET,
    CRON_SECRET: process.env.CRON_SECRET,
  },
});
