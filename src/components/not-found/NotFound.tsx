import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full flex justify-center mt-5 items-center h-56 rounded-lg border-2 border-primary '>
       <div>
        <h1 className="md:col-span-2  text-primary font-semibold w-full text-center  text-2xl ">No results found</h1>
        <p className='text-black'>Try shortening or rephrasing your search.</p>
       </div>
    </div>
  )
}

export default NotFound
