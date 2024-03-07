"use client";

import { signIn, useSession } from "next-auth/react";

const SignInPage = () => {
  const { data: session } = useSession();

  return (
    <div className="h-full w-full">
      <button onClick={() => signIn("google")}>Sign in</button>
      <p>{session && session.user?.name}</p>
      <p>{session && session.user?.email}</p>
    </div>
  );
};

export default SignInPage;
