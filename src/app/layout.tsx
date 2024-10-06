import type { ReactNode } from "react";
import localFont from "next/font/local";

import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import OriginTracker from "@/components/providers/OriginTracker";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import SessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "@/components/ui/toaster";

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
  verification: {
    google: "0Ry7iEopHE0vvfRKRY_Py-CpaOb764pPGqs33RuLBU0",
  },
};

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
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body>
        <QueryClientProvider>
          <SessionProvider>
            <OriginTracker>{children}</OriginTracker>
          </SessionProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
