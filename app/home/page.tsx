/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagesSlider } from "@/components/ui/images-slider";
import { Hero } from "@/components/hero";
import KeyFeatures from "@/components/KeyFeatures";
import DashBoardPreview from "@/components/DashBoardPreview";
import HowItWorks from "@/components/HowItWorks";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/testimonials";
import Stats from "@/components/stats";
import CustomFooter from "@/components/Footer";



export default function Home() {
  return (
    <div className="bg-white">
      <Hero/>
      <DashBoardPreview/>
      <KeyFeatures/>
      <HowItWorks/>
      <AboutUs/>
      <Testimonials/>
      <Stats/>
      <CustomFooter/>


          {/* footer */}
         
    </div>
  );
}
