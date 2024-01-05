"use client";
import Button from "@/components/ui/button/Button";
import React, { lazy, useEffect, useState } from "react";
const Forms = lazy(() => import("./forms/Forms"));
const LoadingButton = lazy(
  () => import("@/components/ui/loadingButton/LoadingButton")
);
import tickiconbg from "../../../../assets/tickicon.png";
import Image from "next/image";

const WithdrawTr = ({ data }) => {
  const [item, setItem] = useState(data);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(item?.tranaction_id);

  useEffect(() => {
    const dateObject = new Date(item.created_at);
    const formattedDate = dateObject.toLocaleString();
    setDate(formattedDate);
  }, [item]);
  const [open, setOpen] = useState(false);
  const handlePopup = async () => {
    setLoading(true);
    setOpen(true);
    setLoading(false);
  };

  return (
    <>
      <tr>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {date}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.txn_type}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.txn_data?.payment_method}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.txn_data?.upi_code} {item?.txn_data?.account_number}
        </td>

        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.txn_data?.ifsc_code}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.points}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.txn_data?.amount}
        </td>

        <td className="text-center border-t-0 h-full flex justify-center   align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {/* onChange={handlePopup} */}
          {!loading ? (
            <>
              {!item?.txn_id ? (
                <Button
                  name="pay"
                  onClick={handlePopup}
                  bg={true}
                  tick={false}
                />
              ) : (
                <div className="flex">
                  <Image src={tickiconbg} alt="tickiconbg" />
                  <h1 className="ml-2">paid </h1>
                </div>
              )}
            </>
          ) : (
            <LoadingButton />
          )}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.txn_id}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.txn_data?.txn_date}
        </td>

        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {item?.txn_data?.name}
        </td>
        <td className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {item?.txn_data?.bank}
          {open && (
            <Forms
              setItem={setItem}
              setOpen={setOpen}
              id={item.uuid}
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default WithdrawTr;
