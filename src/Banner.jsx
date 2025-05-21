import React from 'react'

const Banner = () => {
  return (
    <div className="min-h-[60vh] w-full flex flex-col md:flex-row justify-center items-center text-center">
      <div className='md:flex-2 md:h-[50vh] relative'>
        <img
          className="h-[90vh] object-cover"
          src="https://i.ibb.co/Zb4p3D9/midsection-of-a-doctor-in-uniform-standing-while-standing-on-a-blue-background-photo.webp"
          alt="Doctor"
        />
      </div>
      <div className='md:flex-1 mt-64'>
        <div className="flex flex-col gap-3">
          <h1 className="text-8xl text-blue-900">
            Welcome to <span className="font-bold mt-5">MyHealth</span>
          </h1>
          <p className="text-2xl mt-2 text-gray-500">
            Let's take care of our health
          </p>
        </div>
      </div>
    </div>
  )
}
export default Banner
