import React, { useState } from "react";

import { Button } from "../Button";
import { TextInput } from "../TextInput";

export const EmailLogin = () => {
  const [error, setError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    if (email === "" || password === "") {
      setError(true);
    }
  };

  const openEmailLogin = () => {
    setOpen(true);
  };

  if (!open)
    return (
      <Button className="h-12" onClick={openEmailLogin} key="open email">
        Login with Email
      </Button>
    );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex-col flex gap-4">
        <TextInput
          className="text-foreground h-12"
          label="Email"
          type="email"
          isError={error}
          backgroundColor="bg-background"
          value={email}
          onChange={setEmail}
        />
        <TextInput
          className="text-foreground h-12"
          label="Password"
          type="password"
          isError={error}
          backgroundColor="bg-background"
          value={password}
          onChange={setPassword}
        />
        <Button type="submit" className="h-12">
          Login
        </Button>
      </div>
    </form>
  );
};
