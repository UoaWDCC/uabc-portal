import React from "react";
import type { Message } from "@aws-sdk/client-ses";
import { Button } from "@react-email/button";
import { Html } from "@react-email/html";
import { render } from "@react-email/render";

function Email() {
  return (
    <Html lang="en">
      <Button href={"www.google.com"}>Click me</Button>
    </Html>
  );
}

const BasicEmailTemplate: Message = {
  Body: {
    Html: {
      Charset: "UTF-8",
      Data: render(<Email />),
    },
  },
  Subject: {
    Charset: "UTF-8",
    Data: "Basic Email Template",
  },
};

export { BasicEmailTemplate };
