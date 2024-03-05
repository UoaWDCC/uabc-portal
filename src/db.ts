import { PrismaClient } from "@prisma/client";
import { env } from "./env.mjs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      env.ENVIRONMENT === "DEVELOPMENT"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (env.ENVIRONMENT !== "PRODUCTION") globalForPrisma.prisma = prisma;
