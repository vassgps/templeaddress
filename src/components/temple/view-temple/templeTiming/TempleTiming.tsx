import Image from "next/image";
import React from "react";

import templeTiming from "../../../../assets/TempleTiming.jpg";
import { Temple } from "@/models/interfaces";

const TempleTiming = ({ temple }: { temple: Temple }) => {
  return (
    <div className="flex w-full bg-white mt-10 ">
      <div className="p-2  md:block hidden">
        <Image
          src={templeTiming}
          className="h-[40vh] w-[50vh] rounded-3xl py-3"
          alt="temple History"
        />
      </div>
      <div className="md:p-10 py-5 px-1 w-full">
        <div className="flex justify-center md:w-full ">
          <h1 className="font-poppins text-2xl font-semibold break-keep tracking-normal underline">
            Temple Timing
          </h1>
        </div>  
        <div className="flex pt-10 md:w-full   justify-center  w-full">
          <div>
            <h1 className="font-poppins  md:text-base text-sm text-center font-bold tracking-normal  text-primary">
              {temple.time_slot_1}
            </h1>
            <h1 className="font-poppins  md:text-base text-sm text-center font-bold tracking-normal  text-primary">
              {temple.time_slot_2}
            </h1>
            <h1 className="font-poppins  md:text-base text-sm text-center font-bold tracking-normal  text-primary">
              {temple.time_slot_3}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempleTiming;
