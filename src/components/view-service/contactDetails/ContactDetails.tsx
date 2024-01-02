import Text from "@/components/temple/view-temple/text/Text";
import React from "react";

const ContactDetails = ({ service }) => {
  return (
    <div className="md:w-1/2 w-full bg-white py-5 md:p-10 p-5 mt-2">
      <h1 className="font-Poppins text-xl mr-10 p-5  whitespace-nowrap underline text-center font-semibold tracking-normal ">
        Contact Details
      </h1>
      <div className="flex w-full justify-center">
        <div>
          <Text title="Name" description={service?.name} />
          <Text title="Contact Number" description={service?.telephone} />

          <Text title="Email Address " description={service?.email} />

          <p className="font-Poppins text-sm mt-2 tracking-normal font-normal hover:text-primary cursor-pointer  tracking-normal text-left">
            <strong className="mr-2">Service Areas:</strong>
            {service?.service_areas?.map((item, index) =>
              index !== 0 ? `, ${item}` : item
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
