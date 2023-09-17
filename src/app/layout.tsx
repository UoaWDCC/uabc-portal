import Providers from "@/components/Providers";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: 'UABC Booking Portal',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
