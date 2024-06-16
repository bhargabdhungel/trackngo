import React from 'react'

const Testimonials = () => {
  return (
    <div className="bg-white text-black pt-16 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 text-gray-900 animate__animated animate__fadeIn">
        User Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 card animate__animated animate__fadeIn">
          <div className="w-24 h-24 mb-4">
            <img 
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
            <img 
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
            <img 
              src="https://images.unsplash.com/profile-fb-1544622642-bd417470b1eb.jpg?bg=fff&crop=faces&dpr=2&h=150&w=150&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="User 3" 
              className="object-cover rounded-full border-4 border-gray-600" 
            />
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
  )
}

export default Testimonials
