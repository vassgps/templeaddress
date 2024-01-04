"use client";
import React, { lazy, useEffect, useState } from "react";
import { errorToast, successToast } from "@/toasts/toasts";
const Forms = lazy(() => import("./forms/Forms"));
const ConfirmationPopup = lazy(
  () => import("../../confirmationPopup/confirmationPopup")
);
const LoadingButton = lazy(
  () => import("@/components/ui/loadingButton/LoadingButton")
);

const WithdrawTr = ({ item }) => {
  const [active, setActive] = useState(item?.txn_data?.status);
  const [loading, setLoading] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [tranactionId, setTranactionId] = useState(item?.txn_id);
  const [date, setDate] = useState(item?.tranaction_id);

  useEffect(() => {
    const dateObject = new Date(item.created_at);
    const formattedDate = dateObject.toLocaleString();
    setDate(formattedDate);
  }, [item]);
  const [open, setOpen] = useState(false);
  const handlePopup = async (event) => {
    setLoading(true);
    if (active) {
      setDeletePopup(true);
    } else {
      setOpen(true);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // const data = await put(`admin/withdraw-forms-list/status-pending`, {
    //   id: item.form_id,
    // });
    // setLoading(false)
    // if (data.status) {
    //   setDeletePopup(false)

    //   successToast(`status changed  successfully`);
    //   setActive(data.withdrawForm.status);
    // }else{
    //   errorToast(data.message)
    // }
  };

  return (
    <>
      <tr>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {item?.txn_data?.name}
        </td>
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
          {item?.txn_data?.upi_code}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.txn_data?.account_number}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.txn_data?.ifsc_code}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.points}
        </td>

        <td className="text-center border-t-0 h-full  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {!loading ? (
            <select
              id="countries"
              value={active?"success":"pending"}
              onChange={handlePopup}
              className="bg-primary h-full outline-none py-3 cursor-pointer  border-primary  text-white font-semibold text-sm rounded-lg   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="pending" className="bg-primary text-white p-5">
                pending
              </option>
              <option value="success" className="bg-primary text-white p-5">
                success
              </option>
            </select>
          ) : (
            <LoadingButton />
          )}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {tranactionId}
        </td>
      
      </tr>
      {open && (
        <Forms
          setTranactionId={setTranactionId}
          setOpen={setOpen}
          id={item.form_id}
          setActive={setActive}
        />
      )}
      {deletePopup && (
        <ConfirmationPopup
          message="Are you sure you want to change the status? Your change will delete the transaction ID associated with that time"
          handleSubmit={handleSubmit}
          loading={loading}
          setBlockPopup={setDeletePopup}
        />
      )}
    </>
  );
};

export default WithdrawTr;
