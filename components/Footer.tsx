import React from "react";
import SVGComponent from "./SvgComponents";
import {
  ChartArea,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  Shield,
} from "lucide-react";
import Link from "next/link";

const routes = [
  {
    id: 1,
    label: "Dashboard",
    route: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: 2,
    label: "Response",
    route: "/response",
    icon: <MessageSquare />,
  },
  {
    id: 3,
    label: "Analytics",
    route: "/analytics",
    icon: <ChartArea />,
  },
  {
    id: 4,
    label: "Upgrade",
    route: "/upgrade",
    icon: <Shield />,
  },
  {
    id: 5,
    label: "Settings",
    route: "/settings",
    icon: <Settings2 />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] rounded-[35px] my-6 text-sm py-10 text-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-12 md:px-24">
        <div className="inline-flex h-12 w-12 animate-spin-slow relative before:content-[''] before:top-0 before:bottom-0 before:w-full before:blur-lg before:bg-gradient-to-r from-pink-400 via-yellow-400 to-green-500 before:absolute">
          <SVGComponent />
        </div>
        <nav className="flex flex-row md:flex-row md:justify-center my-5 gap-3 md:gap-7 text-white/70 items-center">
          {routes.map((item) => (
            <Link
              href={item.route}
              key={item.id}
              className="font-normal text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="mt-6">
          &copy; 2024 SmartForms, Inc. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
