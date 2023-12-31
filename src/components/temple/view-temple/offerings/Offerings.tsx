import React from "react";

const Offerings = ({
  title,
  description,
  amount,
  booking_available,
}: {
  booking_available: boolean;
  amount: string;
  description: string;
  title: string;
}) => {
  return (
    <div className="bg-white cursor-pointer hover:bg-primary  text-black hover:text-white p-5 md:p-10 rounded-lg ">
      <h1 className="font-Poppins text-2xl font-semibold leading-30 tracking-normal text-left py-5">
        {title}
      </h1>
      <p className="font-Poppins text-base font-normal leading-7 tracking-normal text-left">
        {description}
      </p>
      <div className="flex justify-between font-sans">
        <h1>Amount : {amount}</h1>
        {booking_available ? <h1 className="text-lime-500 font-bold">Available</h1> : <h1 className="  font-bold">Not Available</h1>}
      </div>
    </div>
  );
};

export default Offerings;
