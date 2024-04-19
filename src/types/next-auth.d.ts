//eslint-disable-next-line
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: "user" | "admin";
    email: string;
    member: boolean | null;
    firstName?: string | null;
    lastName?: string | null;
  }

  interface Session {
    user: User;
  }
}
