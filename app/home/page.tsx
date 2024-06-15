/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { name: 'Total Buses', value: '150' },
  { name: 'Trips Completed', value: '1,245' },
  { name: 'Active Drivers', value: '85' },
  { name: 'On-time Delivery Rate', value: '92%' },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Navbar */}
      <div className="relative">
      <img
        src="https://shipsy.io/wp-content/uploads/2021/09/Blog-Shot-1920x920-1.jpg"
        alt="Instructors"
        className="w-full object-cover opacity-50"
      />
      <nav className="bg-transparent absolute inset-0 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-black">
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
                      className="text-black group-hover:text-gray-700"
                    >
                      Vehicles
                    </Link>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </li>
                  <li className="group relative">
                    <Link
                      href="/driver"
                      className="text-black group-hover:text-gray-700"
                    >
                      Drivers
                    </Link>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </li>
                  <li className="group relative">
                    <Link
                      href="/trip"
                      className="text-black group-hover:text-gray-700"
                    >
                      Trips
                    </Link>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <div className="flex flex-col items-start justify-center px-4 mt-40 mx-4 sm:mx-8 md:mx-12 lg:mx-20 w-full md:w-3/4 absolute inset-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 animate-slideIn text-black">
          Optimize and Streamline Your Fleet Operations with TrackNGo
        </h1>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl max-w-2xl lg:max-w-3xl animate-slideIn text-gray-900">
          Leverage our state-of-the-art tools to monitor vehicle performance,
          manage driver schedules, and plan trips efficiently. TrackNGo empowers
          fleet managers with real-time insights and seamless operations.
        </p>
        <Link href="/signup">
        <Button variant="outline" size="lg" className="my-5">
      Join Now
    </Button>
     </Link>



      </div>
    </div>
   {/* Key Features */}
<div className="bg-black text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
      Key Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="relative overflow-hidden bg-gray-700 rounded-3xl shadow-lg h-full">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('unsplash-photo-1.jpg')" }}></div>
        <div className="relative z-10 flex flex-col h-full p-6 bg-black bg-opacity-50">
          <h3 className="text-xl font-semibold mb-4">Real-Time Tracking</h3>
          <p className="text-gray-400 mb-4">Monitor trucks and drivers in real-time. Get instant updates on their location, speed, and status, ensuring that you always know where your assets are.</p>
          <ul className="text-gray-400 text-left space-y-2 mt-auto">
            <li>• Live GPS tracking</li>
            <li>• Speed monitoring</li>
            <li>• Status updates</li>
            <li>• Geo-fencing alerts</li>
          </ul>
        </div>
      </div>
      <div className="relative overflow-hidden bg-gray-700 rounded-3xl shadow-lg h-full">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('unsplash-photo-2.jpg')" }}></div>
        <div className="relative z-10 flex flex-col h-full p-6 bg-black bg-opacity-50">
          <h3 className="text-xl font-semibold mb-4">Trip Scheduling</h3>

          <p className="text-gray-400 mb-4">Easily plan and manage trips. Schedule routes, assign drivers, and optimize your fleet's efficiency with our intuitive scheduling tools.</p>
          <ul className="text-gray-400 text-left space-y-2 mt-auto">
            <li>• Route planning</li>
            <li>• Driver assignment</li>
            <li>• Trip optimization</li>
            <li>• Automated notifications</li>
          </ul>
        </div>
      </div>
      <div className="relative overflow-hidden bg-gray-700 rounded-3xl shadow-lg h-full">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('unsplash-photo-3.jpg')" }}></div>
        <div className="relative z-10 flex flex-col h-full p-6 bg-black bg-opacity-50">
          <h3 className="text-xl font-semibold mb-4">Driver Management</h3>
          <p className="text-gray-400 mb-4">Keep track of driver details and performance. Maintain comprehensive records and ensure compliance with our driver management features.</p>
          <ul className="text-gray-400 text-left space-y-2 mt-auto">
            <li>• Driver profiles</li>
            <li>• Performance metrics</li>
            <li>• Compliance tracking</li>
            <li>• Incident reporting</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
{/*  How it woeks*/ }
<div className="bg-white text-black py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Step 1: Sign Up */}
      <div className="col">
        <div className="card h-full overflow-hidden text-white bg-gray-800 rounded-lg shadow-lg">
        <Image
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Sign Up"
            className="object-cover w-full h-48 md:h-64 rounded-t-lg"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-300 mb-4">Create your account and get started with our platform.</p>
          </div>
        </div>
      </div>

      {/* Step 2: Add Your Fleet */}
      <div className="col">
        <div className="card h-full overflow-hidden text-white bg-gray-800 rounded-lg shadow-lg">
        <Image
 src="https://plus.unsplash.com/premium_photo-1661637686969-7fbcea8789ad?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
 alt="Add Your Fleet"
 className="object-cover w-full h-48 md:h-64 rounded-t-lg"
          />

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Add Your Fleet</h3>
            <p className="text-gray-300 mb-4">Input your vehicle details and add them to your fleet.</p>
          </div>
        </div>
      </div>

      {/* Step 3: Schedule Trips */}
      <div className="col">
        <div className="card h-full overflow-hidden text-white bg-gray-800 rounded-lg shadow-lg">
          <Image
                      src="https://images.unsplash.com/photo-1707734619119-a3283339147a?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Schedule Trips"
                      className="object-cover w-full h-48 md:h-64 rounded-t-lg"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Schedule Trips</h3>
            <p className="text-gray-300 mb-4">Plan and organize trips with ease using our tools.</p>
          </div>
        </div>
      </div>

      {/* You can add more steps here as needed */}
    </div>
  </div>
</div>

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
              Track and Go was founded with a simple yet powerful mission: to revolutionize fleet management. Our journey when our founders, a group of logistics and technology enthusiasts, saw the need for a more efficient and user-friendly fleet management solution. Since then, we have grown into a dedicated team committed to providing innovative tools that empower fleet managers to optimize their operations.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-400 mb-4">
              Our mission is to streamline fleet operations through cutting-edge technology. We strive to deliver real-time insights, enhance efficiency, and reduce operational costs for our clients. At Track and Go, we believe that managing a fleet should be simple, transparent, and effective.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
            <p className="text-gray-400 mb-4">
              Integrity, innovation, and customer-centricity are at the core of everything we do. We are dedicated to building lasting relationships with our clients by providing exceptional service and continuously improving our platform to meet their evolving needs.
            </p>
          </div>
          <div className="flex justify-center">
          <Image
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" 
              />
          </div>
        </div>
      </div>
    </div>

    

    {/* user testimonials */}
    <div className="bg-white text-black pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-gray-900 animate__animated animate__fadeIn">
          User Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 card animate__animated animate__fadeIn">
            <div className="w-24 h-24 mb-4">
            <Image
                src="https://images.unsplash.com/profile-1627836587305-3c8121a86850image?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="User 1" 
                className="object-cover rounded-full border-4 border-gray-600" 
              />
            </div>
            <p className="text-gray-300 mb-4">
              "Track and Go has transformed our fleet management. The real-time tracking feature is a game-changer!"
            </p>
            <h3 className="text-xl font-semibold text-white">John Doe</h3>
            <p className="text-gray-400">Fleet Manager at XYZ Logistics</p>
          </div>
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 card animate__animated animate__fadeIn">
            <div className="w-24 h-24 mb-4">
              <Image
               src="https://images.unsplash.com/profile-1650823265094-d12ce7a91369image?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
               alt="User 2" 
               className="object-cover rounded-full border-4 border-gray-600" 
              />
            </div>
            <p className="text-gray-300 mb-4">
              "The scheduling and driver management tools have significantly improved our efficiency."
            </p>
            <h3 className="text-xl font-semibold text-white">Jane Smith</h3>
            <p className="text-gray-400">Operations Director at ABC Transport</p>
          </div>
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 card animate__animated animate__fadeIn">
            <div className="w-24 h-24 mb-4">
              <Image  src="https://images.unsplash.com/profile-fb-1544622642-bd417470b1eb.jpg?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="User 3" 
                className="object-cover rounded-full border-4 border-gray-600" />
            </div>
            <p className="text-gray-300 mb-4">
              "The platform is user-friendly and the support team is always ready to help."
            </p>
            <h3 className="text-xl font-semibold text-white">Michael Johnson</h3>
            <p className="text-gray-400">CEO at Rapid Delivery</p>
          </div>
        </div>
      </div>
    </div>

      {/* Our Fleet Stats */}
      <div className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12" style={{ animation: 'fadeIn 1s forwards' }}>Our Fleet Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={stat.name} className="flex flex-col" style={{ animation: `zoomIn 0.5s ${index * 0.1 + 0.5}s forwards` }}>
              <dt className="order-2 mt-2 text-lg md:text-xl lg:text-2xl font-medium text-gray-400">{stat.name}</dt>
              <dd className="order-1 text-3xl md:text-4xl lg:text-5xl font-bold text-white">{stat.value}</dd>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Dashboard previews */}

    <div className="bg-white text-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left">
        <div className="lg:w-1/2 lg:pr-8 mb-6 lg:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            The ultimate solution for truck owners to track buses, drivers, and trips.
          </h1>
          <p className="text-lg md:text-xl">
            Your description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh
            elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
            Mauris massa. Vestibulum lacinia arcu eget nulla.
          </p>
        </div>
        <div className="lg:w-1/2 lg:pl-8 ml-40">
          <Image src="/mobile-removebg-preview.png" alt="Mobile Phone Image" width={400} height={300} />
        </div>
      </div>
    </div>

          {/* footer */}
          <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Truck size={50}/>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/vehicle" className="hover:text-gray-200">Vehicles</a></li>
              <li><a href="/driver" className="hover:text-gray-200">Drivers</a></li>
              <li><a href="/trip" className="hover:text-gray-200">Trips</a></li>
              <li><a href="/about" className="hover:text-gray-200">About Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">
              123 Fleet Street, Suite 100 <br />
              City, State, 12345 <br />
              (123) 456-7890 <br />
              info@trackngo.com
            </p>
          </div>

          {/* Social Media */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* Facebook icon */}
                <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.12 8.438 9.88v-6.987h-2.54v-2.893h2.54V9.576c0-2.506 1.492-3.893 3.777-3.893 1.094 0 2.239.195 2.239.195v2.46h-1.261c-1.242 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.893h-2.33v6.987C18.343 21.12 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* Twitter icon */}
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.95.555-2.005.959-3.127 1.184-.896-.956-2.173-1.555-3.591-1.555-2.723 0-4.932 2.209-4.932 4.932 0 .388.045.765.127 1.124-4.096-.205-7.728-2.166-10.155-5.144-.424.729-.667 1.576-.667 2.476 0 1.71.87 3.214 2.188 4.099-.806-.026-1.566-.248-2.228-.617v.061c0 2.385 1.693 4.374 3.946 4.828-.413.111-.849.171-1.296.171-.317 0-.626-.03-.929-.086.631 1.953 2.463 3.376 4.631 3.415-1.698 1.33-3.832 2.124-6.155 2.124-.4 0-.79-.023-1.175-.069 2.192 1.401 4.798 2.218 7.6 2.218 9.115 0 14.092-7.554 14.092-14.092 0-.215-.004-.428-.013-.641.964-.695 1.8-1.562 2.462-2.549z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                {/* LinkedIn icon */}
                <path d="M19.616 3H4.384C3.062 3 2 4.062 2 5.384v13.232C2 19.938 3.062 21 4.384 21h15.232C20.938 21 22 19.938 22 18.616V5.384C22 4.062 20.938 3 19.616 3zM8.535 18.207H5.912V10.06h2.623v8.147zM7.222 8.749a1.534 1.534 0 1 1 0-3.069 1.534 1.534 0 0 1 0 3.069zm11.075 9.458h-2.623v-4.117c0-.979-.017-2.24-1.364-2.24-1.365 0-1.573 1.064-1.573 2.169v4.188h-2.623v-8.147h2.518v1.112h.035c.35-.665 1.204-1.364 2.477-1.364 2.648 0 3.135 1.744 3.135 4.014v4.385z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-400">
          &copy; {new Date().getFullYear()} TrackNGo. All rights reserved.
        </div>
      </div>
    </footer>

    </div>
  );
}
