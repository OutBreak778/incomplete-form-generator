"use client";

import React, { useRef } from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import pyramid from "../public/noodle.png";
import spring from "../public/spring.png";

const BannerSection = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  return (
    <div ref={ref} className="bg-gray-200/20 rounded-[35px]">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-2xl md:text-3xl font-medium text-black dark:text-white">
                Create your form using AI in seconds.
                <br />
                <span className="mt-4 text-4xl sm:text-[3.2rem] md:text-[5rem] p-3 font-bold leading-none">
                  Create <span className="bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 bg-clip-text text-transparent">form</span> Effortlessly{" "}
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/dashboard-preview.jpg`}
            alt="hero"
            height={720}
            width={1200}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
          <motion.img
            src={spring.src}
            alt="pyramid-image"
            width={310}
            height={310}
            className="mt-10 hidden md:block absolute -top-72 -left-60"
            style={{
              translateY,
            }}
          />

        </ContainerScroll>
      </div>
    </div>
  );
};

export default BannerSection;
