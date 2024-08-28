"use client";

import React from "react";
import {
  BadgeIndianRupeeIcon,
  ChartArea,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const routes = [
  {
    id: 1,
    label: "Control board",
    route: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    label: "Response",
    route: "/dashboard/response",
    icon: MessageSquare,
  },
  {
    id: 3,
    label: "Analytics",
    route: "/dashboard/analytics",
    icon: ChartArea,
  },
  {
    id: 4,
    label: "Upgrade",
    route: "/dashboard/upgrade",
    icon: BadgeIndianRupeeIcon,
  },
  {
    id: 5,
    label: "Settings",
    route: "/dashboard/settings",
    icon: Settings2,
  },
];

const Sidebar = () => {
  const path = usePathname();
  return (
    <div className="h-screen shadow-md border-r">
      <div className="px-4 py-5 gap-y-2">
        {routes.map((item) => (
          <Link
            href={item.route}
            key={item.id}
            className={cn(
              "flex mb-2 items-center gap-4 hover:bg-gradient-to-r hover:from-[#e7e8f3] hover:to-[#e7e8f3] hover:text-gray-800 transition-all rounded-md p-4",
              path == item.route
                ? "bg-gradient-to-r from-[#e7e8f3] to-[#e7e8f3] text-black"
                : "bg-white text-gray-900/80"
            )}
          >
            <item.icon />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;
