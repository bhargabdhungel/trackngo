import React from 'react'
import { Truck } from 'lucide-react'

const CustomFooter = () => {
  return (
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

  )
}

export default CustomFooter
