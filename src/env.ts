import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    ENVIRONMENT: z.string().min(1),
    ACCESS_KEY: z.string().min(1),
    SECRET_ACCESS_KEY: z.string().min(1),
    SENDER_EMAIL_ADDRESS: z.string().min(1),
    AWS_REGION: z.string().min(1),
    SENDER_EMAIL: z.string().min(1),
    APP_URL: z.string().min(1),
    SQID_SECRET: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    ENVIRONMENT: process.env.ENVIRONMENT,
    ACCESS_KEY: process.env.ACCESS_KEY,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    SENDER_EMAIL_ADDRESS: process.env.SENDER_EMAIL_ADDRESS,
    AWS_REGION: process.env.AWS_REGION,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
    APP_URL: process.env.APP_URL,
    SQID_SECRET: process.env.SQID_SECRET,
  },
});
