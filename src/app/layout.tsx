"use client";
import "~/styles/globals.css";
import type { ReactNode } from "react";
import { Header } from "~/core/components/Header";
import { Loader } from "~/core/components/Loader";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
    <head>
        <title>PizzaShop</title>
        <meta name="description" content="Quick pizza delivery" />
    </head>
      <body
        className={`font-muller flex flex-col items-center bg-[linear-gradient(180deg,_#1E0C00_0%,_#1F0700_31%,_#170A00_69%,_#1E0D00_100%)]`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
