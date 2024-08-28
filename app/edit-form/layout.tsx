import Headers from "@/components/Headers";
import Sidebar from "@/components/Sidebar";
import { SignedIn } from "@clerk/nextjs";
import React from "react";

export default function EditFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SignedIn>
      <Headers />

      <div className="px-5 py-3">{children}</div>
    </SignedIn>
  );
}
