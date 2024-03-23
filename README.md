## Getting Started

First, run the development server:

```bash
pnpm dev
```

Then run this to create the .env file

```bash
cp .env-example .env
```

Make sure to update the connection URL in your .env after the command

Run this to bring up Drizzle Studio (This is a very useful database viewer)

```bash
pnpm drizzle-kit studio
```

Run this to push your schema changes to db

```bash
pnpm db:push
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/). This endpoint can be edited in `app/api/route.ts`.

The `app/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) instead of React pages.

## Team:
| Name                     | Role            |
|--------------------------|-----------------|
| Daniel Yang              | Project Manager |
| David Zhu                | Tech Lead       |