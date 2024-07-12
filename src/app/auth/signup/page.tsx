import Link from "next/link";

import { BreakLine } from "@/components/auth/BreakLine";
import { EmailSignUpForm } from "@/components/auth/EmailSignUpForm";
import { GoogleSignIn } from "@/components/auth/GoogleLoginButton";

export default async function SignUpPage() {
  return (
    <div className="mt-8 flex w-full flex-col gap-4">
      <EmailSignUpForm />
      <BreakLine label="or" />
      <GoogleSignIn className="w-full" />
      <p className="mt-2 text-center text-xs text-tertiary dark:text-white">
        Already have an account?{" "}
        <Link className="font-bold underline" href="/auth/login?open=true">
          Log in
        </Link>
      </p>
    </div>
  );
}
