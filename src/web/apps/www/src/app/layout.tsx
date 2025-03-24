import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./Navbar";
import Head from "next/head";

export const metadata: Metadata = {
  title: "modRobots",
  description: "Robots you make, not just assemble.",
  keywords: ["robots", "modular", "DIY", "electronics", "hardware", "software", "open-source", "modRobots"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-title" content="modRobots" />
      </Head>
      <body className={'font-sans'}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
