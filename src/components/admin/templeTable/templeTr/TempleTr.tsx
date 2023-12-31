"use client";
import React, { lazy, useEffect, useState } from "react";
import { Temple } from "@/models/interfaces";
import Button from "@/components/ui/button/Button";
import { put } from "@/Api/Api";
import { useRouter } from "next/navigation";
const ConfirmationPopup = lazy(() => import("@/components/admin/confirmationPopup/confirmationPopup"));
const LoadingButton = lazy(() => import("@/components/ui/loadingButton/LoadingButton"));
import { successToast } from "@/toasts/toasts";

const tr = ({ item }: { item: Temple }) => {
  const router = useRouter();
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [blockPopup, setBlockPopup] = useState(false);

  useEffect(() => {
    setActive(item.active);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const data = await put(`admin/temples-list/active`, { id: item.temple_id });
    if (data && data.status) {
      successToast(`${active ? "Blocked" : " UnBlocked"} successfully`);

      setActive(!active);
      setBlockPopup(false);
    }
    setLoading(false);
  };
  return (
    <>
      <tr>
       
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.name}
        </td>
        <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
          {item.personal_number}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
          {item.contact_number}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700">
          {item.state}
        </td>
     
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
          <Button
            onClick={() => router.push(`/admin/temples/edit/${item.temple_id}`)}
            name="Edit"
            bg={true}
            tick={false}
          />
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
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
                  bgColor={"bg-block"}
                  bg={true}
                  tick={false}
                />
              ) : (
                <LoadingButton />
              )}
            </>
          )}
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
          <a
          target="_blank" 
            href={` ${process.env.NEXT_PUBLIC_BASE_URL}temple/${item.temple_id}`}
            className="bg-primary flex h-12    rounded-lg py-3 px-5 mr-5 text-sm md:text-base   hover:opacity-75 text-white font-semibold"
          >
            view
          </a>
        </td>
        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700">
          {item?.user_id?.email}
        </td>
      </tr>
      {blockPopup && (
        <ConfirmationPopup
        message="Are you sure you want to Block this temple"
          setBlockPopup={setBlockPopup}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default tr;
