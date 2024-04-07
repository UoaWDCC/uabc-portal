import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    newUser: "/onboard",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
