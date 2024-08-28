import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Headers from "@/components/Headers";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartForms",
  description:
    "SmartForms: Smart form generator, effortlessly designed and developed by Nikhil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
