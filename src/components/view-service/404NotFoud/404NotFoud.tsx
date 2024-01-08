import React from 'react'

const NotFoud = ({Poojas}:{Poojas?:string}) => {
  return (
    <div className="border-2 border-primary  mt-5 rounded-xl flex justify-center items-center h-40">
    <div>
      <h1 className="font-Poppins mb-5 mr-5 whitespace-nowrap md:text-5xl  text-3xl text-primary  text-center font-semibold tracking-normal ">
        {Poojas?Poojas:"404"} Not foud
      </h1>
      <div className="flex w-full justify-center">
        <a
          href="/"
          className="p-3 cursor-pointer bg-primary  text-white font-semibold rounded-xl hover:opacity-75"
        >
          Go To Home
        </a>
      </div>
    </div>
  </div>
  )
}

export default NotFoud
