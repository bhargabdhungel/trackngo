import React from 'react'

const HowItWorks = () => {
  return (
    <div className="bg-white text-black py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Step 1: Sign Up */}
      <div className="col">
        <div className="card h-full overflow-hidden text-white bg-gray-800 rounded-lg shadow-lg">
          <img
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
          <img
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
          <img
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

  )
}

export default HowItWorks
