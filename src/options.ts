import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOption: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            checks: ["none"]
        }),
    ],
    session: {
        strategy: "database"
    },
    callbacks: {
        async session({ session, token, user }) {
            // Find the sessionToken related to the user from the sessions table and attach it to the provided session data
            const storedSession = await prisma.session.findFirst({ where: {userId: user.id}});
            session.sessionToken = storedSession?.sessionToken;
            return session;
        }
    }
}