import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const currentUser = await getCurrentUser();
  return NextResponse.json(currentUser ?? "No user found");
}
