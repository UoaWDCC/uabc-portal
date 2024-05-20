import { compare } from "bcrypt";
import { eq, SQL, sql } from "drizzle-orm";
import type { User } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

const emailSchema = z.string().email();
const passwordSchema = z.string().min(8);

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req): Promise<User | null> {
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials?.email ?? ""),
        });
        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await compare(
          credentials?.password ?? "",
          user.password!,
        );
        if (isValid) {
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            member: user.member,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
