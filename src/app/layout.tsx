import { ReactNode } from "react";

import { Providers } from "@/components/Providers";

import "./globals.css";

import { Inter } from "next/font/google";

export const metadata = {
  title: "UABC Booking Portal",
  description: "",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
