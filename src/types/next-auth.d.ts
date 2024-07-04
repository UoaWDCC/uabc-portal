//eslint-disable-next-line
import NextAuth from "next-auth";

export type User = {
  id: string;
  role: "user" | "admin";
  email: string;
  member: boolean | null;
  firstName?: string | null;
  lastName?: string | null;
};
declare module "next-auth/jwt" {
  interface JWT {
    profile?: User;
  }
}

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
