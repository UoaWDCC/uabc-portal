import { Suspense } from "react";
import Link from "next/link";

import { BreakLine } from "@/components/auth/BreakLine";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { GoogleSignIn } from "@/components/auth/GoogleLoginButton";

export const metadata = {
  title: "Login - UABC Booking Portal",
};

export default async function LoginPage() {
  return (
    <div className="mt-8 flex w-full flex-col gap-4">
      <Suspense>
        <EmailLoginForm />
      </Suspense>
      <BreakLine label="or" />
      <GoogleSignIn className="w-full" />
      <p className="mt-2 text-center text-xs text-tertiary dark:text-white">
        Don&apos;t have an account?{" "}
        <Link className="font-bold underline" href="/auth/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}
