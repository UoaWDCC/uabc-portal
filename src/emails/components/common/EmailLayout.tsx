import { Body, Html, Tailwind } from "@react-email/components";

import { config } from "../../tailwind-config";

export function EmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <Html lang="en">
      <Tailwind config={config}>
        <Body className="font-sans text-sm">{children}</Body>
      </Tailwind>
    </Html>
  );
}
