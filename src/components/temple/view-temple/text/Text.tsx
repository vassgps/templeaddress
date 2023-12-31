import React from 'react'

const Text = ({ title, description,br }:{title?:string, description?:string,br?:boolean}) => {
  return (
    <p className="font-Poppins text-sm mt-2 md:whitespace-nowrap font-normal hover:text-primary cursor-pointer  tracking-normal text-left">
        <strong className="mr-2">{title} :</strong>
        {br&&<br className='md:hidden block'/>}
        {description}
      </p>
  )
}

export default Text
