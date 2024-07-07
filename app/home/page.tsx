/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { Truck } from "lucide-react";
import CustomFlipWords from "@/components/flip-word";
import HeroScroll from "@/components/hero-scroll";
import HomeFeatures from "@/components/home-features";
import HomeAuroraBackground from "../test/page";
import HomeStats from "@/components/home-stats";
import HomeTestimonials from "@/components/home-testimonials";

const stats = [
  { name: "Total Buses", value: "150" },
  { name: "Trips Completed", value: "1,245" },
  { name: "Active Drivers", value: "85" },
  { name: "On-time Delivery Rate", value: "92%" },
];

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <CustomFlipWords />
      <HeroScroll />
      <HomeFeatures />

      {/* <div className="bg-white text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col">
              <div className="card h-full overflow-hidden text-white bg-gray-800 rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Sign Up"
                  className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
                  <p className="text-gray-300 mb-4">
                    Create your account and get started with our platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-full overflow-hidden text-white bg-gray-800 rounded-lg shadow-lg">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661637686969-7fbcea8789ad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Add Your Fleet"
                  className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Add Your Fleet</h3>
                  <p className="text-gray-300 mb-4">
                    Input your vehicle details and add them to your fleet.
                  </p>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="card h-full overflow-hidden text-white bg-gray-800 rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1707734619119-a3283339147a?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Schedule Trips"
                  className="object-cover w-full h-48 md:h-64 rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Schedule Trips</h3>
                  <p className="text-gray-300 mb-4">
                    Plan and organize trips with ease using our tools.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div> */}

      {/* About us  */}
      <div className="bg-gray-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left p-6">
              <h3 className="text-2xl font-semibold mb-4">Our Story</h3>
              <p className="text-gray-400 mb-4">
                Track and Go was founded with a simple yet powerful mission: to
                revolutionize fleet management. Our journey when our founders, a
                group of logistics and technology enthusiasts, saw the need for
                a more efficient and user-friendly fleet management solution.
                Since then, we have grown into a dedicated team committed to
                providing innovative tools that empower fleet managers to
                optimize their operations.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-400 mb-4">
                Our mission is to streamline fleet operations through
                cutting-edge technology. We strive to deliver real-time
                insights, enhance efficiency, and reduce operational costs for
                our clients. At Track and Go, we believe that managing a fleet
                should be simple, transparent, and effective.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
              <p className="text-gray-400 mb-4">
                Integrity, innovation, and customer-centricity are at the core
                of everything we do. We are dedicated to building lasting
                relationships with our clients by providing exceptional service
                and continuously improving our platform to meet their evolving
                needs.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <HomeTestimonials />
      <HomeStats />

      <div className="bg-white text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
          <div className="lg:w-1/2 lg:pr-8 mb-6 lg:mb-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              The ultimate solution for truck owners to track buses, drivers,
              and trips.
            </h1>
            <p className="text-lg md:text-xl">
              TrackNGo is a comprehensive bus tracking app designed to
              streamline bus management. It allows operators to effortlessly
              add, track, and manage their bus fleets. With built-in trip
              scheduling, it helps in planning and organizing bus schedules
              efficiently. Driver management features ensure that driver records
              and trip assignments are handled smoothly. The app also provides a
              secure document management system for storing essential documents.
              Users can generate detailed reports on bus usage and trip details.
              TrackNGo is your all-in-one solution for effective bus fleet
              management.
            </p>
          </div>
          <div className="lg:w-1/2 lg:pl-8 ml-40">
            <Image
              src="/mobile-removebg-preview.png"
              alt="Mobile Phone Image"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>

      <HomeAuroraBackground />
    </div>
  );
}
