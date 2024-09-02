import Link from "next/link";

import { EmailResetPassword } from "@/components/auth/EmailResetPassword";

export const metadata = {
  title: "Forgot Password - UABC Booking Portal",
};

export default async function SignUpPage() {
  return (
    <div className="mt-8 flex w-full flex-col gap-4">
      <EmailResetPassword />
      {/* <p className="mt-2 text-center text-xs text-tertiary dark:text-white">
        Back to{" "}
        <Link className="font-bold underline" href="/auth/login?open=true">
          Log in
        </Link>
      </p> */}
    </div>
  );
}
