import { ReactNode } from "react";
import localFont from "next/font/local";

import { Providers } from "@/components/Providers";

import "./globals.css";

import { Inter } from "next/font/google";

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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ProximaNova.variable} ${inter.variable} font-sans`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
