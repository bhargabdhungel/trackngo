import React from 'react'

const stats = [
    { name: 'Total Buses', value: '150' },
    { name: 'Trips Completed', value: '1,245' },
    { name: 'Active Drivers', value: '85' },
    { name: 'On-time Delivery Rate', value: '92%' },
  ];

const Stats = () => {
  return (
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
  
  )
}

export default Stats
