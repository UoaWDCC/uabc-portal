import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { db } from "@/db";
import { env } from "@/env";

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
