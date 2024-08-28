import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDownIcon,
  BadgeIndianRupeeIcon,
  ChevronDown,
  ChevronDownIcon,
  CircleUser,
  GithubIcon,
  LogOut,
  Settings,
  UserCircle,
  UserIcon,
} from "lucide-react";
// import { Button } from "./ui/button";
import DotIcon from "./DotIcon";

// Add imports
import { VariantProps, cva } from "class-variance-authority";

// Configure the styles for the Button and its variants and sizes
const button = cva(["flex", "flex-row", "items-center", "rounded-xl"], {
  variants: {
    variant: {
      primary: [
        "border",
        "border-gray-200",
        "bg-white",
        "text-black",
        "drop-shadow-md",
        "hover:bg-stone-100",
        "hover:text-stone-800",
      ],
      menu: ["bg-transparent", "text-gray-800/70", "hover:text-gray-900"],
    },
    size: {
      regular: ["px-4", "py-3"],
      small: ["py-3", "py-2"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "small",
  },
});

// Extend the default Button types with props created by create-variance-authority


const DropMenu = () => {
  const { signOut, openUserProfile } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="border border-gray-300/50 rounded-xl">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          asChild
          className="border-none outline-none cursor-pointer hover:rounded-none"
        >
          <button className="flex flex-row py-[6px] rounded-xl bg-white px-4 text-black">
            {user?.hasImage ? (
              <Image
                alt={user?.primaryEmailAddress?.emailAddress!}
                src={user?.imageUrl!}
                width={30}
                height={30}
                className="mr-2 rounded-full border border-gray-200 drop-shadow-sm"
              />
            ) : (
              <UserCircle className="w-6 h-6 mr-2" />
            )}
            {user?.username
              ? user.username
              : user?.primaryEmailAddress?.emailAddress!}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="mt-5 w-52 border-none outline-none items-start rounded-xl bg-white px-6 py-4 text-black drop-shadow-2xl">
            <DropdownMenu.Group className="py-3 flex flex-col gap-y-4 items-start justify-start w-full">
              <DropdownMenu.Item
                asChild
                className="border-none outline-none w-full hover:bg-gradient-to-r hover:from-[#e7e8f3] rounded-md hover:to-[#e7e8f3] hover:text-gray-800"
              >
                <button
                  onClick={() => openUserProfile()}
                  className="py-3 flex flex-row px-2  gap-x-4"
                >
                  <CircleUser />
                  Profile
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                asChild
                className="border-none outline-none w-full hover:bg-gradient-to-r hover:from-[#e7e8f3] rounded-md hover:to-[#e7e8f3] hover:text-gray-800"
              >
                <Link
                  href="/dashboard/settings"
                  passHref
                  className="py-3 flex flex-row px-2  gap-x-4"
                >
                  <Settings />
                  Settings
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                asChild
                className="border-none outline-none w-full hover:bg-gradient-to-r hover:from-[#e7e8f3] rounded-md hover:to-[#e7e8f3] hover:text-gray-800"
              >
                <Link
                  href="https://github.com/OutBreak778"
                  passHref
                  className="py-3 flex flex-row px-2 gap-x-4"
                >
                  <GithubIcon />
                  Github
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                asChild
                className="border-none outline-none w-full hover:bg-gradient-to-r hover:from-[#e7e8f3] rounded-md hover:to-[#e7e8f3] hover:text-gray-800"
              >
                <Link
                  href="/dashboard/upgrade"
                  passHref
                  className="py-3 flex flex-row px-2 gap-x-4"
                >
                  <BadgeIndianRupeeIcon />
                  Subscription
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Separator className="my-1 h-px bg-gray-500" />
            <DropdownMenu.Item
              asChild
              className="border-none outline-none hover:bg-gradient-to-r hover:from-[#e7e8f3] rounded-md hover:to-[#e7e8f3] hover:text-gray-800"
            >
              {/* Create a Sign Out button -- signOut() takes a call back where the user is redirected */}
              <button
                onClick={() => signOut(() => router.push("/"))}
                className="py-3 flex flex-row gap-x-4 w-full px-2"
              >
                <LogOut />
                Sign Out{" "}
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default DropMenu;
