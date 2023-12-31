import React from "react";
import { Temple } from "@/models/interfaces";
import Text from "../text/Text";

const AccountDetails = ({ temple }: { temple: Temple }) => {
  return (
    <div className="w-full bg-white mt-5 p-5 md:p-3 ">
      <h1 className="font-Poppins text-xl mr-10 underline whitespace-nowrap text-center font-semibold tracking-normal ">
        About Donations
      </h1>

      <div className=" flex  justify-center">
        <p className="font-Poppins text-sm p-5 lg:w-[80%] font-normal leading-7 tracking-normal text-left">
          {temple?.donations_text}
        </p>
      </div>

      <div className="   md:flex  justify-between ">
        <div className=" flex w-full gap-2   justify-center">
          <div>
            <h1 className="font-Poppins mb-5 text-xl   mr-10 underline whitespace-nowrap text-center font-semibold tracking-normal ">
              Bank Details
            </h1>
            <div className="md:grid md:grid-cols-2 md:gap-3">

            <Text
              br={true}
              title="Account number"
              description={temple?.acc_number}
            />
            <Text br={true} title="IFSE Code" description={temple?.ifsc_code} />
            <Text br={true} title="Bank Name" description={temple?.bank_name} />
            <Text
              br={true}
              title="Account Name"
              description={temple.account_name}
            />
            <Text br={true} title="UPI ID" description={temple?.upi_id} />
            </div>
          </div>
        </div>
        <div className="pt-5 md:pt-0 w-full md:w-1/2">
          <h1 className="font-Poppins text-xl  underline whitespace-nowrap text-center font-semibold tracking-normal ">
            Payments and Donations
          </h1>
          <div className=" flex   justify-center ">
            {temple?.upi_qr && (
              <img className="w-60" src={temple.upi_qr} alt="" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;


