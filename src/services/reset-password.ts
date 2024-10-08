import { and, eq, gt } from "drizzle-orm";

import { db } from "@/lib/db";
import { forgotPasswordTokens } from "@/lib/db/schema";

export async function verifyResetPasswordToken(token: string) {
  const resetPasswordToken = await db.query.forgotPasswordTokens.findFirst({
    where: and(
      eq(forgotPasswordTokens.token, token),
      gt(forgotPasswordTokens.expires, new Date())
    ),
  });

  return !!resetPasswordToken;
}
