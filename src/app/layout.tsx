// "use client";
import { Momo_Trust_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";
import { ApolloWrapper } from "./graphql";

const momoTrust = Momo_Trust_Display({
  variable: "--font-momo-trust",
  subsets: ["latin"],
  weight: ["400"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${momoTrust.variable} ${openSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
