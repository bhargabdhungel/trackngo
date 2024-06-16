"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../components/ui/images-slider";
import Link from "next/link";
import { Truck } from "lucide-react";

export function Hero() {
  const images = [
    "https://plus.unsplash.com/premium_photo-1661932015882-c35eee885897?q=80&w=2806&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1562811950-41d4a4944a4b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1587813369290-091c9d432daf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
          <nav className="bg-transparent absolute inset-0 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-white">
            {/* Company Logo on the left */}
            <div className="">
              <Truck size={50} />
            </div>

            {/* Menu items on the right */}
            <div className="flex">
            <ul className="flex space-x-4 text-xl md:text-2xl lg:text-3xl">
                <ul className="flex space-x-6">
                  {" "}
                  {/* Adjust the value (e.g., space-x-4, space-x-6, etc.) as needed */}
                  <li className="group relative">
                    <Link
                      href="/vehicle"
                      className="text-white group-hover:text-white"
                    >
                      Vehicles
                    </Link>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </li>
                  <li className="group relative">
                    <Link
                      href="/driver"
                      className="text-white group-hover:text-white"
                    >
                      Drivers
                    </Link>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </li>
                  <li className="group relative">
                    <Link
                      href="/trip"
                      className="text-white group-hover:text-white"
                    >
                      Trips
                    </Link>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </nav>

        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
        Manage Your Fleet Efficiently  <br /> The ultimate solution for truck  owners to track buses, drivers, and trips 
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}
