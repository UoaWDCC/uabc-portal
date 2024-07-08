import Sqids from "sqids";

import "server-only";

import { env } from "@/env";

export const sqids = new Sqids({
  alphabet: env.SQID_SECRET,
  minLength: 8,
});

export function obfuscateId(id: number): string {
  return sqids.encode([id]);
}

export function deobfuscateSqid(sqid: string): number {
  return sqids.decode(sqid)[0];
}
