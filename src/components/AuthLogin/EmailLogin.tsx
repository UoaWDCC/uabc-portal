import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

const EmailLogin = ({ className }: { className: string }) => {
  const [error, setError] = useState<boolean>(false);
  return (
    <div className={cn("flex-col flex gap-4", className)}>
      <TextInput
        label="Email"
        type="email"
        isError={error}
        backgroundColor="bg-[#0A172A]"
      />
      <TextInput
        label="Password"
        type="password"
        isError={error}
        backgroundColor="bg-[#0A172A]"
      />
      <Button>Login with Email</Button>
      <div className="mt-2 mb-4 flex whitespace-nowrap w-full justify-center items-center">
        <hr className="w-full border-tertiary" />
        <label className="m-2 w-min rounded-lg text-base">Please login</label>
        <hr className="w-full border-tertiary" />
      </div>
    </div>
  );
};

export default EmailLogin;
