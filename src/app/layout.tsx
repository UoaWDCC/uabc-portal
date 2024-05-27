import type { ReactNode } from "react";
import localFont from "next/font/local";

import { Providers } from "@/components/Providers";

import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "UABC Booking Portal",
  description:
    "Book your badminton sessions with the University of Auckland Badminton Club.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/icon.svg",
        href: "/svgs/icon.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/svgs/icon-darkmode.svg",
        href: "/svgs/icon-darkmode.svg",
      },
    ],
  },
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-content",
};

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
