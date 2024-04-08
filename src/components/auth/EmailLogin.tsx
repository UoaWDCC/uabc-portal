import React, { useState } from "react";

import { Button } from "../Button";
import { TextInput } from "../TextInput";

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

  if (!open) return <Button onClick={openEmailLogin}>Login with Email</Button>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-col flex gap-4">
        <TextInput
          className="text-foreground"
          label="Email"
          type="email"
          isError={error}
          backgroundColor="bg-background"
          value={email}
          onChange={setEmail}
        />
        <TextInput
          className="text-foreground"
          label="Password"
          type="password"
          isError={error}
          backgroundColor="bg-background"
          value={password}
          onChange={setPassword}
        />
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};
