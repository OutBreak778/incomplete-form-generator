"use client";

import React from "react";
import SVGComponent from "./SvgComponents";
import {
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  SignedOut,
  SignInButton,
  useUser,
} from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import DropMenu from "./DropMenu";

const inter = Poppins({ subsets: ["latin-ext"], weight: "700" });

const Headers = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname()

  return !path.includes('live-preview') && (
    <div className="w-full flex sticky top-0 border-b z-20 backdrop-blur-md items-center justify-between h-auto p-1 px-6 md:px-12">
      <Link href="/" className="flex items-center justify-center">
        <div className="animate-spin-slow w-8 mr-2 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16">
          <SVGComponent />
        </div>
        <span className={cn("font-bold text-xl md:text-2xl", inter.className)}>
          SmartForms
        </span>
      </Link>
      <div className="block lg:hidden">
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </div>
      <div className="hidden lg:flex items-center justify-between gap-x-4">
        <div className={cn(isSignedIn ? "block" : "hidden")}>
          {
            <Link href={isSignedIn ? "/dashboard" : "/"} className={path == "/dashboard" ? "hidden" : "block"}>
              <Button variant="outline">Dashboard</Button>
            </Link>
          }
        </div>
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="outline">Connect here</Button>
          </SignInButton>
        </SignedOut>
        <div>
          {isSignedIn ? (
            <>
              <DropMenu />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Headers;
