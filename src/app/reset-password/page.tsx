import { Suspense } from "react";

import { NavigationBar } from "@/components/NavigationBar";
import { EmailResetPassword } from "@/components/auth/EmailResetPassword";

export const metadata = {
  title: "Reset Password - UABC Booking Portal",
};

export default function ResetPasswordPage() {
  return (
    <div className="mx-4 mt-0 flex min-h-dvh flex-col">
      <NavigationBar title="Reset Your Passwords"></NavigationBar>
      <Suspense>
        <EmailResetPassword />
      </Suspense>
    </div>
  );
}
