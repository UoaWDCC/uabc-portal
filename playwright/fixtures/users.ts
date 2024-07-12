import type { Page, TestInfo } from "@playwright/test";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

import { users } from "@/lib/db/schema";
import { db } from "../utils/db";

const userSchema = createSelectSchema(users);
type User = z.infer<typeof userSchema>;

export const login = async (email: string, password: string, page: Page) => {
  const res = await page.request.get("/api/auth/csrf");
  const { csrfToken } = await res.json();

  const data = {
    email: email,
    password: password,
    csrfToken,
  };

  // page.request stores cookies between requests
  await page.request.post(`/api/auth/callback/credentials`, {
    data,
  });

  await page.reload();
};

export const createUserFixture = (user: User, page: Page) => {
  return {
    ...user,
    login: async () => {
      await login(user.email, user.password!, page);
    },
  };
};

export type UserFixture = ReturnType<typeof createUserFixture>;

export const createUsersFixture = (page: Page, _workerInfo: TestInfo) => {
  const store: { users: UserFixture[] } = {
    users: [],
  };

  return {
    create: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const hashedPassword = await bcrypt.hash(password, 12);

      const [user] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          email,
          password: hashedPassword,
        })
        .returning();

      const userFixture = createUserFixture(
        {
          ...user,
          password,
        },
        page
      );

      store.users.push(userFixture);

      return userFixture;
    },
    get: () => store.users,
    cleanup: async () => {
      for (const user of store.users) {
        console.log(user.email);
        await db.delete(users).where(eq(users.id, user.id));
      }
    },
  };
};
