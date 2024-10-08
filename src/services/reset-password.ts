import { createHash } from "crypto";
import { and, eq, gt } from "drizzle-orm";

import { db } from "@/lib/db";
import { forgotPasswordTokens } from "@/lib/db/schema";

export async function verifyResetPasswordToken(token: string) {
  const hashedToken = createHash("sha256").update(token).digest("hex");

  const resetPasswordToken = await db.query.forgotPasswordTokens.findFirst({
    where: and(
      eq(forgotPasswordTokens.token, hashedToken),
      gt(forgotPasswordTokens.expires, new Date())
    ),
  });

  return !!resetPasswordToken;
}
