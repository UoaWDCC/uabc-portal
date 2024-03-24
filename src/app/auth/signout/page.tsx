"use client";

import { signOut } from "next-auth/react";

const SignInPage = () => {
  return (
    <div className="size-full">
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default SignInPage;
