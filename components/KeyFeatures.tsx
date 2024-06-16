import React from 'react'

const KeyFeatures = () => {
  return (
    <div className="bg-gray-900 text-white py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
      Key Features
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="relative overflow-hidden bg-gray-600 rounded-3xl shadow-lg h-full">
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
      <div className="relative overflow-hidden bg-gray-600 rounded-3xl shadow-lg h-full">
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
      <div className="relative overflow-hidden bg-gray-600 rounded-3xl shadow-lg h-full">
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
  )
}

export default KeyFeatures


