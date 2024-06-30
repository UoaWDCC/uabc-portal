import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { compare } from "bcrypt";
import { eq } from "drizzle-orm";
import type { NextAuthOptions, User } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { getUserFromEmail } from "@/services/user";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    newUser: "/onboarding/name",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
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
      async authorize(credentials): Promise<User | null> {
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials?.email ?? ""),
        });
        if (!user) {
          return null;
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
  callbacks: {
    async jwt({ token }) {
      const existingUser = await getUserFromEmail(token.email);

      if (!existingUser) {
        return token;
      }

      return {
        ...token,
        profile: existingUser || null,
      };
    },
    async session({ session, token }) {
      session.user = token.profile as User;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
