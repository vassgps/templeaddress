import Text from '@/components/temple/view-temple/text/Text'
import React from 'react'

const ContactDetails = ({service}) => {
  return (
    <div className="md:w-1/2 w-full bg-white py-5 mt-2">
    <h1 className="font-Poppins text-xl mr-10 p-5  whitespace-nowrap underline text-center font-semibold tracking-normal ">
      Contact Details
    </h1>
    <div className="flex w-full justify-center">
      <div>
      
      <Text
          title="Name"
          description={service?.name}
        />
        <Text
          title="Contact Number"
          description={service?.telephone}
        />

       
        <Text title="Email Address " description={service?.email} />
        <Text
          title="Service Areas "
          description={service?.service_areas?.map((item)=>(item))}
        />
      </div>
    </div>
  </div>
  )
}

export default ContactDetails
