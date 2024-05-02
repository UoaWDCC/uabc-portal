import React, { useState } from "react";

import { TextInput } from "../TextInput";
import { Button } from "../ui/button";

interface EmailLoginProps {
  onLoginOpen: () => void;
}

export const EmailLogin = ({ onLoginOpen }: EmailLoginProps) => {
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  function handleSubmit() {
    if (email === "" || password === "") {
      setError(true);
    }
  }

  function openEmailLogin() {
    onLoginOpen();
    setOpen(true);
  }

  if (!open)
    return (
      <Button large onClick={openEmailLogin}>
        Login with Email
      </Button>
    );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-col flex gap-4">
        <span className="text-foreground text-center">
          Login to your account
        </span>
        <TextInput
          className="text-foreground"
          label="Email"
          type="email"
          isError={error}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          className="text-foreground"
          label="Password"
          type="password"
          value={password}
          isError={error}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button large type="submit">
          Login
        </Button>
      </div>
    </form>
  );
};
