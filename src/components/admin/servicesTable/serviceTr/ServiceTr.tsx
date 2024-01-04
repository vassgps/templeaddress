"use client";
import React, { lazy, useEffect, useState } from "react";
import { Service } from "@/models/interfaces";
import Button from "@/components/ui/button/Button";
import { put } from "@/Api/Api";
import { useRouter } from "next/navigation";
const ConfirmationPopup = lazy(() => import("@/components/admin/confirmationPopup/confirmationPopup"));
const LoadingButton = lazy(() => import("@/components/ui/loadingButton/LoadingButton"));
import { successToast } from "@/toasts/toasts";
import Http from "@/config/Http";

const ServiceTr = ({ item }: { item: Service }) => {
  const router=useRouter()
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [blockPopup, setBlockPopup] = useState(false);
  
  useEffect(()=>{
     setActive(item.status)
  },[])

  const handleSubmit = async (value) => {
    setLoading(true);
    const { data } = await Http.post(`utils/toggle-status/`, {
      slug: "servicedata",
      obj_id: item.uuid,
      status: value
    });    
    if (data&&data.success) {
      successToast(`${active?"Blocked":" UnBlocked"} successfully`);
      setActive(!active);
      setBlockPopup(false);
    }
    setLoading(false);
  };
  return (
      <>
    <tr>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700">
        {item?.email}
      </th>
      <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {item.name}
      </td>
      <td className="text-center border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {item.mobile}
      </td>
      
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
        {item.location}
      </td>
     
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center">
        <Button
          onClick={() => router.push(`/admin/services/edit/${item.uuid}`)}
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
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
     
        <a
          target="_blank" 
            href={` ${process.env.NEXT_PUBLIC_BASE_URL}service/${item.slug}`}
            className="bg-primary flex h-12    rounded-lg py-3 px-5 mr-5 text-sm md:text-base   hover:opacity-75 text-white font-semibold"
          >
            view
          </a>
      </td>
    </tr>
    {blockPopup &&<ConfirmationPopup message="Are you sure you want to Block this service" setBlockPopup={setBlockPopup} loading={loading} handleSubmit={()=>handleSubmit(false)}/>}
    </>
  );
};

export default ServiceTr;
