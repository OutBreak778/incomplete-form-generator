import Headers from "@/components/Headers";
import Sidebar from "@/components/Sidebar";
import { SignedIn } from "@clerk/nextjs";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <Headers />

      <div className="md:w-56 hidden md:block fixed">
        <Sidebar />
      </div>
      <div className="md:ml-56">{children}</div>
    </SignedIn>
  );
}
