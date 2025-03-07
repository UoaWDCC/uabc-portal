FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN npm install -g corepack@latest && \
    corepack enable
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
RUN npm install -g corepack@latest && \
    corepack enable
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Set to standalone output for dockerised depoyment
ENV BUILD_STANDALONE true

ARG APP_URL

ENV ENVIRONMENT "PRODUCTION"
ENV NEXTAUTH_URL ${APP_URL}
ENV APP_URL ${APP_URL}
# The below values are set to empty strings as they are not needed at build time.
ENV GOOGLE_CLIENT_ID " "
ENV GOOGLE_CLIENT_SECRET " "
ENV SES_ACCESS_KEY " "
ENV SES_SECRET_ACCESS_KEY " "
ENV MAIL_FROM "user@example.com"
ENV REPLY_TO "user@example.com"
ENV AWS_REGION " "
ENV SQID_SECRET "ABC"
ENV CRON_SECRET " "

RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=NEXTAUTH_SECRET \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" \
    NEXTAUTH_SECRET="$(cat /run/secrets/NEXTAUTH_SECRET)" \
    pnpm db:push

RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=NEXTAUTH_SECRET \
    DATABASE_URL="$(cat /run/secrets/DATABASE_URL)" \
    NEXTAUTH_SECRET="$(cat /run/secrets/NEXTAUTH_SECRET)" \
    pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
