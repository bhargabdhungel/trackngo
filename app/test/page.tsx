"use client";

import { AuroraBackground } from "@/components/aurora-background";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function HomeAuroraBackground() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          TracknGo
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Easy and Fast Tracking of Vehicles
        </div>
        <Link
          href="/dashboard"
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
        >
          Join Now
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}
