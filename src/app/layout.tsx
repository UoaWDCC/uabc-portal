import { ReactNode } from "react";
import localFont from "next/font/local";

import { Providers } from "@/components/Providers";

import "./globals.css";

export const metadata = {
  title: "UABC Booking Portal",
  description: "",
};

const ProximaNova = localFont({
  src: [
    {
      path: "../../public/fonts/proximanova_regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/proximanova_bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-proxima",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${ProximaNova.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
