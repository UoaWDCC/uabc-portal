import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

const EmailLogin = ({ className }: { className: string }) => {
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <form>
      <div className={cn("flex-col flex gap-4", className)}>
        <div className="flex-col flex gap-4">
          <TextInput
            className="text-white h-12"
            label="Email"
            type="email"
            isError={error}
            backgroundColor="bg-[#0A172A]"
            value={email}
            onChange={setEmail}
          />
          <TextInput
            className="text-white h-12"
            label="Password"
            type="password"
            isError={error}
            backgroundColor="bg-[#0A172A]"
            value={password}
            onChange={setPassword}
          />
        </div>
        <Button type="submit">Login with Email</Button>
      </div>
    </form>
  );
};

export default EmailLogin;
