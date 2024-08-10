import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./Navbar";

export const metadata: Metadata = {
  title: "ModRobots",
  description: "Robots you make, not just assemble",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'font-sans'}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
