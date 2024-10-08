import { Suspense } from "react";
import { redirect } from "next/navigation";
import { z } from "zod";

import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { BackNavigationBar } from "@/components/BackNavigationBar";
import { verifyResetPasswordToken } from "@/services/reset-password";

export const metadata = {
  title: "Reset Password - UABC Booking Portal",
};

const searchParamsSchema = z.object({
  token: z.string(),
});

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const parseResult = searchParamsSchema.safeParse(searchParams);

  if (!parseResult.success) {
    return redirect("/auth/login");
  }

  const { token } = parseResult.data;

  const isTokenValid = await verifyResetPasswordToken(token);

  if (!isTokenValid) {
    return redirect("/auth/login");
  }

  return (
    <div className="mx-4 mt-0 flex min-h-dvh flex-col">
      <BackNavigationBar
        title="Reset Your Passwords"
        pathName="/auth/login"
      ></BackNavigationBar>
      <ResetPasswordForm token={token} />
    </div>
  );
}
