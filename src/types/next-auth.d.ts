//eslint-disable-next-line
import NextAuth from "next-auth";

import type { PlayLevel } from "./types";

export type User = {
  id: string;
  role: "user" | "admin";
  email: string;
  member: boolean | null;
  verified: boolean;
  firstName?: string | null;
  lastName?: string | null;
  playLevel?: PlayLevel | null;
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
    verified: boolean;
    firstName?: string | null;
    lastName?: string | null;
    playLevel?: PlayLevel | null;
  }

  interface Session {
    user: User;
  }
}
