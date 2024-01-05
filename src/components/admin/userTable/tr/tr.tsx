"use client";
import React, { useState } from "react";
import { User } from "@/models/interfaces";
import Button from "@/components/ui/button/Button";
import ConfirmationPopup from "../../confirmationPopup/confirmationPopup";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";
import { successToast } from "@/toasts/toasts";
import Http from "@/config/Http";

const Tr = ({ user }: { user: User }) => {
  const [active, setActive] = useState(user.status);
  
  const [loading, setLoading] = useState(false);
  const [blockPopup, setBlockPopup] = useState(false);
  const handleSubmit = async (value:boolean) => {
    setLoading(true);    
    const { data } = await Http.post(`utils/toggle-status/`, {
      slug: "customuser",
      obj_id: user.uuid,
      status: value
    }); 
    if (data && data.success) {
      successToast(`${active?"Blocked":" UnBlocked"} successfully`);
      setActive(value);
      setBlockPopup(false);
    }
    setLoading(false);
  };
  return (
    <>
      <tr>
        <th className="text-center border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4  text-blueGray-700 ">
          {user.first_name}
        </th>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {user?.email}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.mobile_number}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.referred_by}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.wallet_balance}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {active ? (
            
            <Button
              onClick={() => setBlockPopup(true)}
              name="Block"
              bg={true}
              tick={false}
            />
            
          ) : (
            <>
            {!loading ? (
              <Button
                onClick={()=>handleSubmit(true)}
                name="unblock"
                bg={true}
                bgColor={"bg-block"}
                tick={false}
              />
            ) : (
              <LoadingButton/>
            )}
          </>
          )}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {user?.username}
        </td>
      </tr>
      {blockPopup && (
        <ConfirmationPopup
        message="Are you sure you want to Block this user"
          handleSubmit={()=>handleSubmit(false)}
          loading={loading}
          setBlockPopup={setBlockPopup}
        />
      )}
    </>
  );
};

export default Tr;
