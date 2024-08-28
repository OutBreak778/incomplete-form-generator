"use client";

import { cn } from "@/lib/utils";
import { Asap, Comfortaa } from "next/font/google";
import cog from "../public/cog.png";
import pyramid from "../public/pyramid.png";
import cylinder from "../public/3dCylinder.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import BannerSection from "@/components/BannerSection";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import Headers from "@/components/Headers";
import { Highlight } from "@/components/Highlight";

const inter = Asap({ subsets: ["latin"], weight: "600" });
const para = Comfortaa({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const ref = useRef(null);
  const { isSignedIn } = useUser();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-150, 850]);
  return (
    <main
      ref={ref}
      className="flex min-h-screen flex-col items-center justify-between px-2 overflow-x-clip"
    >
      {" "}
      <Headers />
      <div className="container px-5">
        <div className="md:flex mb-16 items-center justify-between">
          <div className="md:w-[478px]">
            <div className="text-sm inline-flex border border-[#222]/10 px-1 py-2 my-4 tracking-tight rounded-lg">
              Version 2.0 is here
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight py-1 bg-gradient-to-b md:bg-gradient-to-b from-slate-900 to-[#001E80] bg-clip-text text-transparent">
              Dynamic Forms with SmartForm
            </h1>
            <p className="text-xl text-[#010d3e] tracking-tight mt-6">
              SmartForms leverages advanced AI to automatically generate
              customized forms with ease. Designed by{" "}
              <Highlight>Nikhil Mishra</Highlight>, it simplifies form creation,
              making it intuitive and efficient for any project.
            </p>
            <div className={cn("flex gap-3 items-center mt-6")}>
              <Link href={isSignedIn ? "/dashboard" : "/sign-in"}>
                <Button variant="default">
                  {isSignedIn ? (
                    <span>Go to Dashboard</span>
                  ) : (
                    <span> Learn more</span>
                  )}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[544px] md:flex-1 relative">
            <motion.img
              src={cog.src}
              alt="hero-image"
              className="md:absolute md:h-[95%] md:w-auto md:max-w-none lg:left-40"
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={cylinder.src}
              alt="cylinder image"
              width={180}
              className="hidden md:block -top-1 -left-20 md:absolute"
              style={{
                translateY: translateZ,
              }}
            />
            <motion.img
              src={pyramid.src}
              alt="cylinder image"
              width={200}
              className="hidden xl:block -bottom-20 right-5 rotate-[30deg] md:absolute"
              style={{
                translateY: translateY,
              }}
            />
          </div>
        </div>
        <div>
          <BannerSection />
        </div>
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </main>
  );
}
