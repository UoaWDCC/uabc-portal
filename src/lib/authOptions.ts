import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthOptions, User } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "@/lib/db";
import { getUserFromEmail } from "@/services/user";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  pages: {
    signIn: "/sessions",
    signOut: "/auth/login",
    newUser: "/onboard",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
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
