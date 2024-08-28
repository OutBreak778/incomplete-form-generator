import Headers from "@/components/Headers";
import Sidebar from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import { Roboto } from "next/font/google";
import React from "react";

const inter = Roboto({ subsets: ["latin"], weight: "500" });

export default function LivePreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <Headers />

      <div className="px-5 py-3">
        {children}
        <div
          className={cn(
            "fixed bottom-6 px-3 py-2 left-6 border-2 border-gray-400/20 bg-gray-900/90 text-gray-100 rounded-lg",
            inter.className
          )}
        >
          Made by SmartForms Inc.
        </div>
      </div>
    </SignedIn>
  );
}
