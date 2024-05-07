import React from "react";
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";

interface EmailProps {
  url: string;
}

export function Email(props: EmailProps) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}
