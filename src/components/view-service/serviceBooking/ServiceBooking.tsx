import Text from "@/components/temple/view-temple/text/Text";
import React from "react";

const ServiceBooking = ({ service }) => {
  return (
    <div className="md:w-1/2 w-full bg-white p-5 mt-2  py-5">
      <h1 className="font-Poppins text-xl mr-10 p-5  whitespace-nowrap underline text-center font-semibold tracking-normal ">
        Service Booking
      </h1>
      <div className="flex w-full justify-center">
        <div>
          <div className="flex gap-3">
            <h1 className="font-bold">Booking :</h1>
            {service?.enable_booking ? (
              <h1 className="text-lime-500 font-bold">Available</h1>
            ) : (
              <h1 className="  font-bold">Not Available</h1>
            )}
          </div>
          <Text
            title="Consulting Time "
            description={service?.consulting_time}
          />
          <Text title="Landmark " description={service?.landmark} />
          <Text title="Location " description={service?.location} />
          <Text title="State " description={service?.state} />
          <Text title="District " description={service?.district} />
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;
