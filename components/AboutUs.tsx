import React from 'react'

const AboutUs = () => {
  return (
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
            <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
        </div>
      </div>
    </div>

    
  )
}

export default AboutUs
