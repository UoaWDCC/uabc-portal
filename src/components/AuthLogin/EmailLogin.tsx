import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

const EmailLogin = ({ className }: { className: string }) => {
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const HandleSubmit = (e) => {
    if (!open) {
      setOpen(true);
    }
    return;
  };

  const openEmailLogin = () => {
    if (!open) {
      setOpen(true);
    }
  };

  return (
    <form onSubmit={() => HandleSubmit}>
      <div className={cn("flex-col flex gap-4", className)}>
        {/* p-0.5 to compensate for borderwidth */}
        <div
          className={cn(
            "flex-col flex gap-4 overflow-hidden p-0.5 pt-2",
            open ? "h-auto" : "p-0 h-0",
          )}
        >
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
        {open ? (
          <Button type="submit" className="h-12" key="form submit">
            Login
          </Button>
        ) : (
          <Button className="h-12" onClick={openEmailLogin} key="open email">
            Login with Email
          </Button>
        )}
      </div>
    </form>
  );
};

export default EmailLogin;
