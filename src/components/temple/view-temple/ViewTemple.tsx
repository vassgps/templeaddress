"use client";

import React, { useEffect, useState } from "react";
import TempleHistory from "./templeHistory/TempleHistory";
import Offerings from "./offerings/Offerings";
import TempleTiming from "./templeTiming/TempleTiming";
import AccountDetails from "./accountDetails/AccountDetails";
import Text from "./text/Text";
import Loader from "@/components/ui/loader/Loader";
import { Temple } from "@/models/interfaces";
import googleImage from "../../../assets/GoogleMap.png";
import Image from "next/image";
import GoogleMapEmbed from "@/components/GoogleMapEmbed/GoogleMapEmbed";
import Gallery from "@/components/ui/gallery/Gallery";
import Http from "@/config/Http";

const ViewTemple =({ templeId }) => {
  const [loading, setLoading] = useState(true);
  const [temple, setTemple] = useState<Temple | undefined>();

  useEffect(() => {
    (async () => {      
      const {data}  = await Http.get(`cms/temples/temple-details/${templeId}`);      
      
      setTemple(data.data)
      setLoading(false)
    })();
  }, [templeId]);

  return (
    <>
      {!loading ? (
        temple ? (
          <>
            <div className="  mt-5">
              <div className="flex w-full   justify-center items-center">
                <Image
                  className="rounded-2xl h-[60vh]"
                  src={temple?.image}
                  width={1000}
                  height={10}
                  alt="table Img1"
                />
              </div>
              <div className=" p-5  pt-0">
                  <Gallery   gallery={temple?.gallery[0]}/>
              </div>
            </div>
            <TempleHistory
             social_media={temple?.social_media[0]}
              
              name={temple?.name}
              contact_number={temple?.mobile}
              description={temple?.description}
            />
            <div className="md:flex w-full justify-center mt-5 md:bg-white pt-5  p-3 md:p-10">
              <div className="flex md:block justify-center md:w-1/2 p-5 md:p-10 bg-white">
                <div className=" md:border-r   ">
                  <h1 className="font-Poppins text-xl mr-10 whitespace-nowrap underline text-center font-semibold tracking-normal ">
                    Way to Temple
                  </h1>
                  <div className="md:whitespace-nowrap gap-1  grid md:grid-cols-2 grid-cols-1  mt-3">
                    <Text title="Landmark" description={temple?.landmark} />
                    <Text title="Town" description={temple?.town} />
                    <Text title="District" description={temple?.district} />
                    <Text title="State" description={temple?.state} />
                    <Text title="Country" description={temple?.country} />
                    <Text title="zip code" description={temple?.zipcode} />

                    <div className="flex justify-between  mt-5 lg:w-[40%]">
                      <a href={temple.map_url} target="_blank"  className="flex ">
                        <Image
                          src={googleImage}
                          alt="googleMapImg"
                          className="w-4 h-4"
                        />
                        <h1
                          style={{ color: " rgba(13, 121, 200, 1)" }}
                          className=" font-poppins text-xs ml-1 mr-5 bottom-0  font-semibold  tracking-normal "
                        >
                          Google Map
                        </h1>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 bg-white pt-5 md:p-10 md:mt-0 mt-2">
                <h1 className="font-Poppins whitespace-nowrap text-xl mr-10 underline text-center font-semibold tracking-normal ">
                  Deity ( പ്രതിഷ്ഠ )
                </h1>
                <div className="flex flex-wrap items-center justify-center  mt-5">
                <div className="p-3 pl-2 pt-0 bg-white"><strong className="mr-2">{temple.deity}{temple.deity_list.length>0 && ", "}</strong></div>
                  {temple.deity_list.length>0&&temple.deity_list.map((item,index)=>(<div key={index} className="p-3 pl-2 pt-0 bg-white"><strong className="mr-2">{item}{index!=temple.deity_list.length-1&& ", "}</strong></div>)) }
                </div>
              </div>
            </div>
            <AccountDetails temple={temple} />
            <TempleTiming temple={temple} />

            {temple.pooja_details && temple.pooja_details.length > 0 && (
              <>
                <div className=" mx-auto flex justify-center w-full pb-10  mt-5">
                  <div>
                    <h1 className="font-Poppins text-2xl font-semibold   tracking-normal text-left">
                    Pooja Details
                    </h1>
                    <hr className=" w-36  h-0.5  bg-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
                {temple.pooja_details&&  temple.pooja_details.map((item,index)=>(<Offerings
                    key={index+item.name}
                    title={item.name}
                    description={item.description}
                    amount={item.amount}
                    booking_available={item.booking_available}
                  />))}
               
                </div>
                <div className="w-full mt-5"></div>
              </>
            )}
            {temple.embedded_url && (
              <div className="mt-5">
                <h1 className="font-Poppins text-2xl mb-2 font-semibold   tracking-normal text-left">
                  Location :-
                </h1>

                <GoogleMapEmbed data={temple.embedded_url} />
              </div>
            )}
          </>
        ) : (
          <>
            <div className="border-2 border-primary  mt-5 rounded-xl flex justify-center items-center h-40">
              <div>
                <h1 className="font-Poppins mb-5 mr-5 whitespace-nowrap text-3xl  md:text-5xl  text-primary  text-center font-semibold tracking-normal ">
                  404 Not foud
                </h1>
                <div className="flex w-full justify-center">
                  <a
                    href="/"
                    className="p-3 cursor-pointer bg-primary  text-white font-semibold rounded-xl hover:opacity-75"
                  >
                    Go To Home
                  </a>
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewTemple;
