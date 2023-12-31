"use client";
import React, { useState } from "react";
import { User } from "@/models/interfaces";
import Button from "@/components/ui/button/Button";
import ConfirmationPopup from "../../confirmationPopup/confirmationPopup";
import { put } from "@/Api/Api";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";
import { successToast } from "@/toasts/toasts";

const Tr = ({ user }: { user: User }) => {
  const [active, setActive] = useState(user.active);
  const [loading, setLoading] = useState(false);
  const [blockPopup, setBlockPopup] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const data = await put(`admin/users-list/active`, { id: user.user_id });
    if (data&&data.status) {
      successToast(`${active?"Blocked":" UnBlocked"} successfully`);
      setActive(!active);
      setBlockPopup(false);
    }
    setLoading(false);
  };
  return (
    <>
      <tr>
        <th className="text-center border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4  text-blueGray-700 ">
          {user.name}
        </th>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          {user?.email}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.phone_number}
        </td>
        <td className="text-center border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.referrer?.email}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {user.coins}
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
                  onClick={handleSubmit}
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
      </tr>
      {blockPopup && (
        <ConfirmationPopup
        message="Are you sure you want to Block this user"
          handleSubmit={handleSubmit}
          loading={loading}
          setBlockPopup={setBlockPopup}
        />
      )}
    </>
  );
};

export default Tr;
