"use client";
import React, { lazy, useState } from "react";
import { put } from "@/Api/Api";
import { errorToast, successToast } from "@/toasts/toasts";
const Forms = lazy(() => import("./forms/Forms"));
const ConfirmationPopup = lazy(() => import("../../confirmationPopup/confirmationPopup"));
const LoadingButton = lazy(() => import("@/components/ui/loadingButton/LoadingButton"));


const WithdrawTr = ({ item }) => {
  const [active, setActive] = useState(item.status);
  const [loading, setLoading] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [tranactionId, setTranactionId] = useState(item?.tranaction_id);

  const [open, setOpen] = useState(false);

  const handlePopup = async (event) => {
    setLoading(true);
    if(active!='pending'){
      setDeletePopup(true)
    }else{
      setOpen(true)
    }
    setLoading(false);
  };


  
  const handleSubmit = async () => {
    setLoading(true)
    const data = await put(`admin/withdraw-forms-list/status-pending`, {
      id: item.form_id,
    });
    setLoading(false)
    if (data.status) {
      setDeletePopup(false)

      successToast(`status changed  successfully`);
      setActive(data.withdrawForm.status);
    }else{
      errorToast(data.message)
    }
  };

 
  return (
    <>
      <tr>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {item.name}
        </td>
       
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.payment_method}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.upi_code}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.account_number}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.ifsc_code}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.money}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.coins}
        </td>
        <td className="text-center border-t-0 h-full  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {!loading?<select
            id="countries"
            value={active}
            onChange={handlePopup}
            className="bg-primary h-full outline-none py-3 cursor-pointer  border-primary  text-white font-semibold text-sm rounded-lg   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
          >
            <option value="pending" className="bg-primary text-white p-5" > 
              pending
            </option>
            <option value="success" className="bg-primary text-white p-5"  >success</option>
          </select>:<LoadingButton />}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {tranactionId}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item?.user_id?.phone_number}
        </td>
        <td className="text-center border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4  text-blueGray-700 ">
          {item?.user_id?.email}
        </td>
        
      </tr>
     {open&& <Forms  setTranactionId={setTranactionId} setOpen={setOpen} id={item.form_id} setActive={setActive}/>}
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
