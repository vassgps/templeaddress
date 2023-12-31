"use client";
import React, { useEffect, useState } from "react";
import { Service } from "@/models/interfaces";
import Location from "../ui/location/Location";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";
import GoogleMapEmbed from "../GoogleMapEmbed/GoogleMapEmbed";
import Loader from "../ui/loader/Loader";
import NotFoud from "./404NotFoud/404NotFoud";
import ServiceBooking from "./serviceBooking/ServiceBooking";
import ContactDetails from "./contactDetails/ContactDetails";
import OnlinePayment from "./onlinePayment/OnlinePayment";
import MoreDetails from "./moreDetails/MoreDetails";
import Http from "@/config/Http";
import Gallery from "../ui/gallery/Gallery";

const ViewService =  ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState<Service | undefined>();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const {data}  = await Http.get(`cms/temples/service-details/${id}`);    
        
      setService(data.data);
      setLoading(false);
    })();
  }, [id]);

  return (
    <>
      {!loading ? (
        <>
          {service ? (
            <div className=" lg:mx-40 mx-5 mt-5 mb-10">
              <div className=" grid  md:grid-cols-3 grid-cols-2  mt-10">
                <div className="md:col-span-1 col-span-2 md:mx-0 mx-10 flex    ">
                  <img
                    className=" rounded-tr-2xl rounded-bl-2xl  h-max "
                    src={service.image}
                    alt="temple History"
                  />
                </div>
                <div className="col-span-2 bg-white md:mt-5 mt-2 rounded-lg lg:rounded-none p-5 md:p-10">
                  <h1 className="font-Poppins text-2xl  font-semibold leading-24 tracking-normal text-left">
                    {service.name}
                  </h1>
                  <p className="font-Poppins text-sm mt-5 lg:w-[80%] font-normal leading-7 tracking-normal text-left">
                    {service.description}
                  </p>
                  <div className="flex gap-3 mt-2">
                    {service?.social_media[0]?.whatsapp_number && (
                      <Link
                      target="_blank" 
                        href={"http://wa.me/+91" + service?.social_media[0]?.whatsapp_number}
                        className="  bg-white cursor-pointer text-green-600 "
                      >
                        {React.createElement(FaSquareWhatsapp, { size: "25" })}
                      </Link>
                    )}
                    {service?.social_media[0]?.facebook_link && (
                      <Link
                      target="_blank" 
                        href={service?.social_media[0]?.facebook_link}
                        className=" bg-white cursor-pointer text-blue-500 "
                      >
                        {React.createElement(FaFacebook, { size: "25" })}
                      </Link>
                    )}
                    {service?.social_media[0]?.instagram_link && (
                      <Link
                      target="_blank" 
                        href={service?.social_media[0]?.instagram_link}
                        className="  bg-white cursor-pointer text-pink-600 "
                      >
                        {React.createElement(FaInstagramSquare, { size: "25" })}
                      </Link>
                    )}
                    {service?.social_media[0]?.youtube_link && (
                      <Link
                      target="_blank" 
                        href={service?.social_media[0]?.youtube_link}
                        className="  bg-white cursor-pointer text-red-600 "
                      >
                        {React.createElement(IoLogoYoutube, { size: "27" })}
                      </Link>
                    )}

                  </div>
                  <div className="flex justify-between  mt-3 lg:w-[40%]">
                    <Location
                      googleMapLink={service?.map_url}
                      location={service?.location}
                    />
                  </div>
                </div>
              </div>
              {service.gallery && service.gallery.length > 0 && (
                <div className="bg-white mt-2 p-5">
                  <h1 className="font-Poppins text-2xl mr-10   whitespace-nowrap  text-left font-semibold tracking-normal ">
                    previous works
                  </h1>
                  <Gallery gallery={service?.gallery[0]} />
                </div>
              )}

              <div className=" md:flex gap-2 mt-2 w-full">
                <ContactDetails service={service} />
                <ServiceBooking service={service} />
              </div>
              <div className=" md:flex gap-2 mt-2 w-full">
                <OnlinePayment service={service} />
                <MoreDetails service={service} />
              </div>

              {service.embedded_url && (
                <div className="mt-5">
                  <h1 className="font-Poppins text-2xl mb-2 font-semibold   tracking-normal text-left">
                    Location :-
                  </h1>
                  <GoogleMapEmbed data={service.embedded_url} />
                </div>
              )}
            </div>
          ) : (
            <>
              <NotFoud />
            </>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewService;
