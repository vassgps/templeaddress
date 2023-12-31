import Link from "next/link";
import React from "react";

const MoreDetails = ({ service }) => {
  return (
    <div className="md:w-1/2 w-full bg-white py-5 mt-2">
      <h1 className="font-Poppins text-xl mr-10 p-5  whitespace-nowrap underline text-center font-semibold tracking-normal ">
        More Details
      </h1>
      <div className="flex w-full justify-center">
        <div className="p-5 pt-0">
          <p className="font-Poppins text-sm  hover:text-primary  font-normal leading-7 tracking-normal text-left">
            {service.description} <Link href="#" className="font-Poppins text-sm  hover:text-primary font-normal leading-7 tracking-normal text-left">
            <strong className="text-primary">Read more about {service.name}</strong> (Link to section)
          </Link>
          </p>
         
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
