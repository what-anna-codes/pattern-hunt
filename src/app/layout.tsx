"use client";
import { Momo_Trust_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql";

const momoTrust = Momo_Trust_Display({
  variable: "--font-momo-trust",
  subsets: ["latin"],
  weight: ["400"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

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
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
