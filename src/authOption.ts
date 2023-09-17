import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./db";

export const authOption: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    newUser: "/onboard"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      checks: ["none"],
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
