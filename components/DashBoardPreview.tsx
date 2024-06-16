import React from 'react'
import Image from 'next/image'

const DashBoardPreview = () => {
  return (
    
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
  )
}

export default DashBoardPreview
