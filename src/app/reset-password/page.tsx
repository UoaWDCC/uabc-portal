import { Suspense } from "react";

import { BackNavigationBar } from "@/components/BackNavigationBar";
import { EmailResetPassword } from "@/components/auth/EmailResetPassword";
import path from "path";

export const metadata = {
  title: "Reset Password - UABC Booking Portal",
};

export default function ResetPasswordPage() {
  return (
    <div className="mx-4 mt-0 flex min-h-dvh flex-col">
      <BackNavigationBar title="Reset Your Passwords" pathName={`${!process.env.NEXTAUTH_URL}`}></BackNavigationBar>
      <Suspense>
        <EmailResetPassword />
      </Suspense>
    </div>
  );
}
