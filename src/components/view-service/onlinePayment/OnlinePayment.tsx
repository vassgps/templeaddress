import Text from '@/components/temple/view-temple/text/Text'
import React from 'react'
import { Service } from "@/models/interfaces";

const OnlinePayment = ({service}:{service:Service}) => {
  return (
    <div className="md:w-1/2 w-full bg-white py-5 mt-2">
    <h1 className="font-Poppins text-xl mr-10 p-5  whitespace-nowrap underline text-center font-semibold tracking-normal ">
    Online payment
    </h1>
    <div className="flex w-full justify-center">
      <div>
      <Text
          title="Account Name"
          description={service?.account_name}
        />
        {service?.bank_name&& <Text
          title="Bank Name"
          description={service?.bank_name}
        />}


        <Text
          title="Account number"
          description={service?.acc_number}
        />
        <Text
          title="IFSE Code"
          description={service?.ifsc_code}
        />
        <Text title="UIP/VPA ID " description={service?.upi_id} />
        
      </div>
    </div>
  </div>
  )
}

export default OnlinePayment
