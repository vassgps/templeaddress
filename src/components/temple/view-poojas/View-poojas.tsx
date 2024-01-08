"use client";
import React, { useEffect, useState } from "react";
import Button from "../../ui/button/Button";
import { useRouter } from "next/navigation";
import Http from "@/config/Http";
import { Pooja } from "@/models/interfaces";
import Offerings from "../view-temple/offerings/Offerings";
import NotFoud from "@/components/view-service/404NotFoud/404NotFoud";
import Loader from "@/components/ui/loader/Loader";

const ViewPoojas = ({ templeId }: { templeId: string }) => {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(true);

  const [poojas, setPoojas] = useState<Pooja[] |null| undefined>(null);
  const router = useRouter();
  const id =typeof window !== "undefined" ? localStorage.getItem("id") : null;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await Http.get(`cms/temples/temple-details/${templeId}`);
      if (data.success) {        
        setAdmin(data.data.created_by==id)
        setPoojas(data.data.pooja_details);
      }else{
        setPoojas(undefined);
      }
        setLoading(false);
      
    })();
  }, [templeId,id]);

  return (
    <>
      {!loading ? (
        <>
          {(poojas != undefined &&poojas&& poojas.length>0 )&&admin&& (
            <div className="flex mt-5 justify-center">
              <Button
                name="Add Pooja"
                onClick={() => router.push(`/temple/${templeId}/add-pooja`)}
                bg={true}
                tick={false}
              />
            </div>
          )}

          {poojas && poojas.length > 0 ? (
            <>
              <div className="grid grid-cols-1  md:grid-cols-2 gap-8 mt-10">
                {poojas &&
                  poojas.map((item, index) => (
                    <Offerings
                      admin={admin}
                      uuid={item.uuid}
                      key={index + item.uuid}
                      title={item.name}
                      description={item.description}
                      amount={item.amount}
                      booking_available={item.booking_available}
                    />
                  ))}
              </div>
              <div className="w-full mt-5"></div>
            </>
          ) : poojas != undefined && admin? (
            <div className="border-2 border-primary rounded-xl flex justify-center mt-5 items-center h-40">
              <button
                onClick={() => router.push(`/temple/${templeId}/add-pooja`)}
              >
                <h1 className="font-Poppins mb-5 mr-5 whitespace-nowrap text-xl   text-center font-semibold tracking-normal ">
                  Add Your Pooja
                </h1>
                <div className="flex justify-center">
                  <Button name="Add Pooja" bg={true} tick={false} />
                </div>
              </button>
            </div>
          ) : (
            <> {!poojas && poojas === undefined ? <NotFoud />: <NotFoud Poojas={'Poojas'} />}</>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center w-full  h-full">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewPoojas;
