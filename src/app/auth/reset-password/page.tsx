import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { BackNavigationBar } from "@/components/BackNavigationBar";
import { Card } from "@/components/Card";
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
    return (
      <div className="mx-4 flex min-h-dvh flex-col">
        <BackNavigationBar
          title="Reset Your Password"
          pathName="/auth/login?open=true"
        />
        <div className="grid grow place-items-center">
          <Card
            variant="card"
            className="bg-destructive text-destructive-foreground"
          >
            <h1 className="pb-1 text-lg font-semibold tracking-tight">
              Expired Link
            </h1>
            This password reset link has expired. Please request a new one{" "}
            <Link
              className="text-right font-bold underline"
              href="/auth/forgot-password"
            >
              here
            </Link>
            .
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 flex min-h-dvh flex-col">
      <BackNavigationBar
        title="Reset Your Password"
        pathName="/auth/login?open=true"
      />
      <div className="grid grow place-items-center">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
